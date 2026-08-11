import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { CAREER_QUARANTINE_LEGACY_PATHS } from "../client/src/data/career-question-quarantine";
import { applyCareerQuestionCorrection } from "../client/src/data/career-question-corrections.curated";
import { normalizeLegacyClientQuestion } from "../client/src/lib/legacy-question-contract";

const ROOT="client/src/data/career-questions";
type Row={file:string;id:string;career:string;difficulty:number;status:"authored-v2"|"legacy-derived";distractorOrigin:string;issues:string[];stem:string};
const CLINICAL_REVIEW_PATTERNS:Array<[string,RegExp]>=[
  ["hypoxic_drive_oversimplification",/suppress(?:es|ing)?\s+(?:their\s+)?hypoxic\s+(?:ventilatory\s+)?drive/i],
  ["routine_oxygen_copd_drive_claim",/primary respiratory drive may shift to hypoxic drive/i],
  ["absolute_never_always",/\b(?:always|never)\b.{0,40}\b(?:oxygen|anticoag|medication|treatment|therapy)\b/i],
  ["template_primary_diagnosis",/primary\s+[a-z][\w &/-]*\s+diagnosis|differential\s*\d+|unrelated\s+diagnosis/i],
];
function rel(f:string){return f.split(path.sep).join("/");}
function collect(dir:string):string[]{if(!fs.existsSync(dir))return[];const out:string[]=[];for(const e of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())out.push(...collect(f));else if(/-questions\.(ts|tsx)$/.test(e.name)&&!CAREER_QUARANTINE_LEGACY_PATHS.has(rel(f)))out.push(f);}return out;}
function unwrap(n:ts.Expression):ts.Expression{while(ts.isAsExpression(n)||ts.isTypeAssertionExpression(n)||ts.isParenthesizedExpression(n)||ts.isNonNullExpression(n))n=n.expression;return n;}
function propName(p:ts.ObjectLiteralElementLike):string|null{return ts.isPropertyAssignment(p)&&(ts.isIdentifier(p.name)||ts.isStringLiteralLike(p.name))?p.name.text:null;}
function literal(n:ts.Expression|null):any{if(!n)return undefined;n=unwrap(n);if(ts.isStringLiteralLike(n))return n.text;if(ts.isNumericLiteral(n))return Number(n.text);if(n.kind===ts.SyntaxKind.TrueKeyword)return true;if(n.kind===ts.SyntaxKind.FalseKeyword)return false;if(ts.isArrayLiteralExpression(n))return n.elements.map(e=>ts.isExpression(e)?literal(e):undefined);if(ts.isObjectLiteralExpression(n)){const o:Record<string,any>={};for(const p of n.properties)if(ts.isPropertyAssignment(p)){const k=propName(p);if(k)o[k]=literal(p.initializer);}return o;}return undefined;}
function object(n:ts.ObjectLiteralExpression):Record<string,any>{const o:Record<string,any>={};for(const p of n.properties)if(ts.isPropertyAssignment(p)){const k=propName(p);if(k){const v=literal(p.initializer);if(v!==undefined)o[k]=v;}}return o;}
function careerFrom(file:string):string{return path.basename(file).replace(/-v2-questions\.(ts|tsx)$/,'').replace(/-questions\.(ts|tsx)$/,'');}
function jurisdiction(career:string){return{regionScope:"GLOBAL",languageCode:"en",exam:career};}
const rows:Row[]=[];
for(const file of collect(ROOT)){
  const source=fs.readFileSync(file,"utf8"),sf=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,file.endsWith(".tsx")?ts.ScriptKind.TSX:ts.ScriptKind.TS);let ordinal=0;
  const visit=(node:ts.Node)=>{if(ts.isObjectLiteralExpression(node)){
    const parsed=object(node);const initialStem=String(parsed.stem||parsed.question||"").trim(),initialOptions=Array.isArray(parsed.options)?parsed.options:null,initialRationale=String(parsed.rationale||parsed.rationaleCorrect||"").trim();
    if(initialStem&&initialOptions&&initialOptions.length>=2&&initialRationale){ordinal++;const career=careerFrom(file),id=String(parsed.id||`${career}-${ordinal}`),raw=applyCareerQuestionCorrection({...parsed,id});const stem=String(raw.stem||raw.question||"").trim(),options=Array.isArray(raw.options)?raw.options:[],rationale=String(raw.rationale||raw.rationaleCorrect||"").trim(),q=normalizeLegacyClientQuestion(raw,ordinal-1,jurisdiction(career)),issues:string[]=[];
      if(!Number.isInteger(Number(raw.difficulty))||Number(raw.difficulty)<1||Number(raw.difficulty)>4)issues.push("invalid_difficulty");
      if(q.metadataOrigin!=="authored-v2")issues.push("missing_authored_v2_teaching");
      if(q.distractorMetadataOrigin==="derived-fallback")issues.push("missing_authored_distractor_rationale");
      const combined=`${stem} ${rationale} ${options.map((x:any)=>typeof x==="object"?x.text:x).join(" ")}`;for(const [code,re] of CLINICAL_REVIEW_PATTERNS)if(re.test(combined))issues.push(code);
      rows.push({file:rel(file),id,career,difficulty:Number(raw.difficulty),status:q.metadataOrigin,distractorOrigin:q.distractorMetadataOrigin||"unknown",issues:[...new Set(issues)],stem});
    }
  }ts.forEachChild(node,visit);};visit(sf);
}
const byCareer:Record<string,any>={},issueCounts:Record<string,number>={};
for(const row of rows){const c=byCareer[row.career]||={total:0,authoredV2:0,legacyDerived:0,explicitDistractors:0,extractedDistractors:0,fallbackDistractors:0,blocking:0,issues:{}};c.total++;if(row.status==="authored-v2")c.authoredV2++;else c.legacyDerived++;if(row.distractorOrigin==="explicit")c.explicitDistractors++;else if(row.distractorOrigin==="authored-rationale-extracted"||row.distractorOrigin==="mixed")c.extractedDistractors++;else if(row.distractorOrigin==="derived-fallback")c.fallbackDistractors++;if(row.issues.length)c.blocking++;for(const issue of row.issues){c.issues[issue]=(c.issues[issue]||0)+1;issueCounts[issue]=(issueCounts[issue]||0)+1;}}
const byCareerRows=Object.entries(byCareer).map(([career,v]:any)=>({career,...v})).sort((a,b)=>b.total-a.total),blockingRows=rows.filter(r=>r.issues.length);
console.log(JSON.stringify({totalQuestions:rows.length,authoredV2:rows.filter(r=>r.status==="authored-v2").length,legacyDerived:rows.filter(r=>r.status!=="authored-v2").length,issueCounts,byCareer:byCareerRows,sampleBlocking:blockingRows.slice(0,300)},null,2));
if(blockingRows.length)process.exitCode=2;
