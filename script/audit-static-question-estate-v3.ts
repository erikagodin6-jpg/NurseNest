import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { createHash } from "node:crypto";

const ROOTS = [
  "client/src/data/exam-questions",
  "client/src/data/career-questions",
  "server/seeds",
  "server/seed-data",
  "server/data",
];
const SKIP_SEGMENTS = ["__tests__","test","tests","fixture","fixtures","flashcard","lesson"];

type Item={file:string;line:number;id:string;stem:string;options:string[];answer:string;type:string;fields:Set<string>};
function walk(root:string):string[]{if(!fs.existsSync(root))return[];const out:string[]=[];const visit=(d:string)=>{for(const e of fs.readdirSync(d,{withFileTypes:true})){const f=path.join(d,e.name);const lower=f.toLowerCase();if(SKIP_SEGMENTS.some(s=>lower.split(/[\\/]/).includes(s)))continue;if(e.isDirectory())visit(f);else if(/\.(?:ts|tsx|js|cjs|mjs)$/.test(e.name))out.push(f);}};visit(root);return out;}
function pname(n:ts.PropertyName|undefined){return n&&(ts.isIdentifier(n)||ts.isStringLiteral(n)||ts.isNumericLiteral(n))?n.text:null;}
function props(n:ts.ObjectLiteralExpression){const m=new Map<string,ts.ObjectLiteralElementLike>();for(const p of n.properties){if(ts.isPropertyAssignment(p)||ts.isShorthandPropertyAssignment(p)){const k=pname(p.name);if(k)m.set(k,p);}}return m;}
function init(p:ts.ObjectLiteralElementLike|undefined):ts.Expression|null{return p&&ts.isPropertyAssignment(p)?p.initializer:null;}
function literal(e:ts.Expression|null):string{if(!e)return"";if(ts.isStringLiteralLike(e)||ts.isNumericLiteral(e))return e.text;if(e.kind===ts.SyntaxKind.TrueKeyword)return"true";if(e.kind===ts.SyntaxKind.FalseKeyword)return"false";return"";}
function arrStrings(e:ts.Expression|null):string[]{if(!e||!ts.isArrayLiteralExpression(e))return[];return e.elements.map(el=>{if(ts.isStringLiteralLike(el)||ts.isNumericLiteral(el))return el.text;if(ts.isObjectLiteralExpression(el)){const m=props(el);return literal(init(m.get("text")))||literal(init(m.get("content")))||literal(init(m.get("value")))||literal(init(m.get("label")));}return"";}).filter(Boolean);}
function looks(m:Map<string,ts.ObjectLiteralElementLike>){return (m.has("stem")||m.has("question")||m.has("questionText"))&&(m.has("options")||m.has("answerOptions")||m.has("correctAnswer")||m.has("correctIndex")||m.has("questionType"));}
function norm(v:string){return v.toLowerCase().replace(/<[^>]+>/g," ").replace(/[^a-z0-9.%°/+-]+/g," ").replace(/\s+/g," ").trim();}
function fp(item:Item){return createHash("sha256").update([norm(item.stem),...item.options.map(norm).sort()].join("\u0001")).digest("hex");}
function answerPosition(raw:string,options:string[]):number|null{if(!raw)return null;const n=Number(raw);if(Number.isInteger(n)&&n>=0&&n<options.length)return n;if(/^[A-Z]$/i.test(raw)){const i=raw.toUpperCase().charCodeAt(0)-65;return i>=0&&i<options.length?i:null;}const i=options.findIndex(o=>norm(o)===norm(raw));return i>=0?i:null;}

const files=ROOTS.flatMap(walk);const items:Item[]=[];
for(const file of files){const source=fs.readFileSync(file,"utf8");const sf=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,file.endsWith("x")?ts.ScriptKind.TSX:ts.ScriptKind.TS);const visit=(n:ts.Node)=>{if(ts.isObjectLiteralExpression(n)){const m=props(n);if(looks(m)){const stem=literal(init(m.get("stem")||m.get("question")||m.get("questionText")));const options=arrStrings(init(m.get("options")||m.get("answerOptions")));if(stem){const line=sf.getLineAndCharacterOfPosition(n.getStart(sf)).line+1;const id=literal(init(m.get("id")||m.get("questionId")||m.get("blueprintId")));const answer=literal(init(m.get("correctAnswer")||m.get("correctIndex")||m.get("answerKey")));const type=literal(init(m.get("questionType")||m.get("question_type")))||"unknown";items.push({file:file.replace(/\\/g,"/"),line,id,stem,options,answer,type,fields:new Set(m.keys())});}}}ts.forEachChild(n,visit);};visit(sf);}

const byFile=new Map<string,Item[]>();for(const item of items){const a=byFile.get(item.file)||[];a.push(item);byFile.set(item.file,a);}
const fieldAliases:Record<string,string[]>={stableId:["id","questionId","blueprintId"],distractors:["distractorRationales","distractor_rationales","incorrectAnswerRationale"],correctExplanation:["correctAnswerExplanation","correct_answer_explanation","learningObjective"],hint:["hint","examStrategy","exam_strategy"],why:["whyThisMatters","why_this_matters","keyTakeaway","key_takeaway"],pearl:["clinicalPearl","clinical_pearl","examPearl"],country:["countryCode","country_code","country","regionScope","region_scope"],language:["languageCode","language_code","locale"],rationale:["rationale","rationaleCorrect","rationale_correct"]};
function has(item:Item,names:string[]){return names.some(n=>item.fields.has(n));}
const reports:any[]=[];let totalDup=0,totalUnique=0,total=0;
for(const [file,rows] of byFile){const groups=new Map<string,Item[]>();const pos=new Map<number,number>();let positional=0;const debt:Record<string,number>={};for(const row of rows){const key=fp(row);const g=groups.get(key)||[];g.push(row);groups.set(key,g);const p=answerPosition(row.answer,row.options);if(p!==null){pos.set(p,(pos.get(p)||0)+1);positional++;}for(const [field,aliases] of Object.entries(fieldAliases))if(!has(row,aliases))debt[field]=(debt[field]||0)+1;if(row.options.length&&row.options.every(Boolean))debt.primitiveOptions=(debt.primitiveOptions||0)+1;if(row.fields.has("correctIndex"))debt.positionalAnswer=(debt.positionalAnswer||0)+1;}
  const unique=groups.size;const duplicates=rows.length-unique;total+=rows.length;totalUnique+=unique;totalDup+=duplicates;const dist=Object.fromEntries([...pos.entries()].sort((a,b)=>a[0]-b[0]).map(([i,n])=>[String.fromCharCode(65+i),n]));const max=positional?Math.max(...pos.values(),0)/positional:0;reports.push({file,questions:rows.length,uniqueFingerprints:unique,duplicateRows:duplicates,duplicateRate:rows.length?Number((duplicates/rows.length).toFixed(4)):0,answerPositionDistribution:dist,maxAnswerPositionShare:Number(max.toFixed(4)),severeAnswerPositionBias:positional>=25&&max>.55,missingFieldCounts:debt,sampleDuplicateClusters:[...groups.values()].filter(g=>g.length>1).slice(0,5).map(g=>({count:g.length,stem:g[0].stem.slice(0,180),ids:g.slice(0,10).map(x=>x.id)}))});}
reports.sort((a,b)=>b.duplicateRows-a.duplicateRows||b.questions-a.questions);
const summary={filesScanned:files.length,questionObjects:total,uniqueFingerprints:totalUnique,duplicateRows:totalDup,duplicateRate:total?Number((totalDup/total).toFixed(4)):0,filesWithSevereAnswerBias:reports.filter(r=>r.severeAnswerPositionBias).length,filesWithDuplicates:reports.filter(r=>r.duplicateRows>0).length,worstFiles:reports.slice(0,100)};
console.log(JSON.stringify(summary,null,2));
if(process.argv.includes("--strict")&&(summary.duplicateRows>0||summary.filesWithSevereAnswerBias>0))process.exitCode=1;
