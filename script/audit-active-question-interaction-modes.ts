import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { QUESTION_SOURCE_QUARANTINE_PATHS } from "../client/src/data/exam-questions/question-quarantine";

const ROOTS=["client/src/data/exam-questions","client/src/data/career-questions","client/src/data/newgrad/scenario-questions","client/src/pages/international-nurses"];
function rel(file:string){return file.split(path.sep).join("/");}
function unwrap(n:ts.Expression):ts.Expression{while(ts.isAsExpression(n)||ts.isTypeAssertionExpression(n)||ts.isParenthesizedExpression(n)||ts.isNonNullExpression(n))n=n.expression;return n;}
function name(p:ts.ObjectLiteralElementLike):string|null{return ts.isPropertyAssignment(p)&&(ts.isIdentifier(p.name)||ts.isStringLiteralLike(p.name))?p.name.text:null;}
function prop(n:ts.ObjectLiteralExpression,k:string):ts.Expression|null{for(const p of n.properties)if(name(p)===k&&ts.isPropertyAssignment(p))return p.initializer;return null;}
function str(n:ts.Expression|null):string{if(!n)return"";n=unwrap(n);return ts.isStringLiteralLike(n)?n.text.trim():"";}
function files(root:string):string[]{if(!fs.existsSync(root))return[];const out:string[]=[];const walk=(d:string)=>{for(const e of fs.readdirSync(d,{withFileTypes:true})){const f=path.join(d,e.name);if(e.isDirectory())walk(f);else if(/\.(ts|tsx)$/.test(e.name)&&!/\.test\.|\.spec\./.test(e.name)&&!e.name.includes("question-contract-enrichment")&&!QUESTION_SOURCE_QUARANTINE_PATHS.has(rel(f)))out.push(f);}};walk(root);return out;}
function canonical(raw:string,mode:string):string{
  const t=raw.trim().toLowerCase().replace(/[\s-]+/g,"_");
  if(["mcq","multiple_choice","single_choice","image_based"].includes(t))return"MCQ";
  if(["sata","select_all_that_apply","multi_select","multiple_response"].includes(t))return"SATA";
  if(["ordered","ordered_response"].includes(t))return"ORDERED_RESPONSE";
  if(["drag_drop","drag_and_drop"].includes(t))return mode.toLowerCase()==="categorize"?"ORDER_REVIEW":"ORDERED_RESPONSE";
  if(["cloze","fill_in_blank","dropdown_cloze","drag_drop_cloze"].includes(t))return"CLOZE";
  if(["matrix","matrix_select","matrix_single","matrix_multi","dropdown_table"].includes(t))return"MATRIX";
  if(["bowtie","bow_tie"].includes(t))return"BOWTIE";
  if(["trend","trend_analysis"].includes(t))return"TREND";
  if(["case_study","case_study_series","ngn_case","ngn_case_study"].includes(t))return"NGN_CASE";
  if(["chart_review","lab_interpretation"].includes(t))return"CHART_REVIEW";
  if(["order_review","matching_grid","multi_response_grouping"].includes(t))return"ORDER_REVIEW";
  if(["hot_spot","hotspot","highlight"].includes(t))return"UNMAPPED_VISUAL";
  return"UNMAPPED";
}
const counts:Record<string,number>={};const mappings:Record<string,number>={};const samples:Record<string,Array<{file:string;line:number;type:string;mode:string}>>={};
for(const file of ROOTS.flatMap(files)){
 const src=fs.readFileSync(file,"utf8"),sf=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,file.endsWith(".tsx")?ts.ScriptKind.TSX:ts.ScriptKind.TS);
 const visit=(n:ts.Node)=>{if(ts.isObjectLiteralExpression(n)){
   const type=str(prop(n,"questionType"))||str(prop(n,"question_type"))||str(prop(n,"type"));
   if(type){const mode=str(prop(n,"mode"));const key=`${type.toLowerCase()}${mode?`:${mode.toLowerCase()}`:""}`;counts[key]=(counts[key]||0)+1;const mapped=canonical(type,mode);mappings[mapped]=(mappings[mapped]||0)+1;if(mapped.startsWith("UNMAPPED")){samples[mapped]||=[];if(samples[mapped].length<100){const lc=sf.getLineAndCharacterOfPosition(n.getStart(sf));samples[mapped].push({file:rel(file),line:lc.line+1,type,mode});}}}
 }ts.forEachChild(n,visit);};visit(sf);
}
console.log(JSON.stringify({quarantinedFilesExcluded:QUESTION_SOURCE_QUARANTINE_PATHS.size,sourceInteractionCounts:counts,canonicalMappings:mappings,unmappedSamples:samples},null,2));
if((mappings.UNMAPPED||0)>0||(mappings.UNMAPPED_VISUAL||0)>0)process.exitCode=2;
