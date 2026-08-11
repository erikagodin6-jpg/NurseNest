import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { QUESTION_SOURCE_QUARANTINE_PATHS } from "../client/src/data/exam-questions/question-quarantine";

const ROOTS=["client/src/data/exam-questions","client/src/data/career-questions","client/src/data/newgrad/scenario-questions","client/src/pages/international-nurses"];
const TEMPLATE_OPTION=/^(?:primary\s+[a-z][\w &/-]*\s+diagnosis|[a-z][\w &/-]*\s+differential\s*\d+|unrelated\s+diagnosis|correct\s+answer|incorrect\s+answer\s*\d*|option\s*[a-d1-9])$/i;
const TEMPLATE_RATIONALE=/(?:findings|presentation|symptoms)\s+(?:are|is)\s+consistent\s+with\s+(?:the\s+)?primary\s+.+?diagnosis\s+based\s+on\s+(?:the\s+)?characteristic\s+clinical\s+presentation/i;
const GENERIC_FILLER=/(?:primary\s+[a-z][\w &/-]*\s+(?:diagnosis|condition)|differential\s*\d+|unrelated\s+diagnosis|appropriate intervention for this condition|based on characteristic clinical presentation)/i;
function rel(file:string){return file.split(path.sep).join("/");}
function unwrap(n:ts.Expression):ts.Expression{while(ts.isAsExpression(n)||ts.isTypeAssertionExpression(n)||ts.isParenthesizedExpression(n)||ts.isNonNullExpression(n))n=n.expression;return n;}
function pname(p:ts.ObjectLiteralElementLike):string|null{return ts.isPropertyAssignment(p)&&(ts.isIdentifier(p.name)||ts.isStringLiteralLike(p.name))?p.name.text:null;}
function prop(n:ts.ObjectLiteralExpression,k:string):ts.Expression|null{for(const p of n.properties)if(pname(p)===k&&ts.isPropertyAssignment(p))return p.initializer;return null;}
function str(n:ts.Expression|null):string{if(!n)return"";n=unwrap(n);return ts.isStringLiteralLike(n)?n.text.trim():"";}
function strings(n:ts.Expression|null):string[]{if(!n)return[];n=unwrap(n);if(!ts.isArrayLiteralExpression(n))return[];return n.elements.flatMap(e=>{if(!ts.isExpression(e))return[];const x=unwrap(e);if(ts.isStringLiteralLike(x))return[x.text.trim()];if(ts.isObjectLiteralExpression(x))return[str(prop(x,"text"))||str(prop(x,"label"))||str(prop(x,"value"))].filter(Boolean);return[];});}
function files(root:string):string[]{if(!fs.existsSync(root))return[];const out:string[]=[];const walk=(d:string)=>{for(const e of fs.readdirSync(d,{withFileTypes:true})){const f=path.join(d,e.name);if(e.isDirectory())walk(f);else if(/\.(ts|tsx)$/.test(e.name)&&!/\.test\.|\.spec\./.test(e.name)&&!e.name.includes("question-contract-enrichment")&&!QUESTION_SOURCE_QUARANTINE_PATHS.has(rel(f)))out.push(f);}};walk(root);return out;}
const issues:Array<{file:string;line:number;id:string;field:string;text:string;code:string}>=[];const byCode:Record<string,number>={};const byFile:Record<string,number>={};
for(const file of ROOTS.flatMap(files)){
 const source=fs.readFileSync(file,"utf8"),sf=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,file.endsWith(".tsx")?ts.ScriptKind.TSX:ts.ScriptKind.TS);
 const visit=(n:ts.Node)=>{if(ts.isObjectLiteralExpression(n)){
   const id=str(prop(n,"id"))||str(prop(n,"questionId"))||"<no-id>";const stem=str(prop(n,"stem"))||str(prop(n,"question"))||str(prop(n,"questionText"));const rationale=str(prop(n,"rationale"))||str(prop(n,"rationaleCorrect"));const opts=strings(prop(n,"options")||prop(n,"answerOptions"));
   const found:Array<[string,string,string]>=[];
   opts.forEach((v,i)=>{if(TEMPLATE_OPTION.test(v)||GENERIC_FILLER.test(v))found.push(["templated_option",`options[${i}]`,v]);});
   if(rationale&&(TEMPLATE_RATIONALE.test(rationale)||GENERIC_FILLER.test(rationale)))found.push(["templated_rationale","rationale",rationale]);
   if(stem&&GENERIC_FILLER.test(stem)&&opts.some(v=>TEMPLATE_OPTION.test(v)||GENERIC_FILLER.test(v)))found.push(["templated_question","stem",stem]);
   if(found.length){const lc=sf.getLineAndCharacterOfPosition(n.getStart(sf));for(const[code,field,value]of found){issues.push({file:rel(file),line:lc.line+1,id,field,text:value.slice(0,240),code});byCode[code]=(byCode[code]||0)+1;byFile[rel(file)]=(byFile[rel(file)]||0)+1;}}
 }ts.forEachChild(n,visit);};visit(sf);
}
const largestFiles=Object.entries(byFile).map(([file,count])=>({file,count})).sort((a,b)=>b.count-a.count).slice(0,100);
console.log(JSON.stringify({blockingTemplateIssues:issues.length,quarantinedFilesExcluded:QUESTION_SOURCE_QUARANTINE_PATHS.size,byCode,largestFiles,sample:issues.slice(0,300)},null,2));
if(issues.length)process.exitCode=2;
