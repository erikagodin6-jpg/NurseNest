import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const ROOTS = [
  "client/src/data/exam-questions",
  "client/src/data/career-questions",
  "client/src/data/newgrad/scenario-questions",
  "client/src/pages/international-nurses",
];

type Family =
  | "explicit-v2"
  | "structured-bank-question"
  | "advanced-structured"
  | "legacy-flat-with-rationale"
  | "question-like-other";

type Row = { id:string; file:string; line:number; family:Family; tier:string; questionType:string };

function unwrap(node:ts.Expression):ts.Expression{
  while(ts.isAsExpression(node)||ts.isTypeAssertionExpression(node)||ts.isParenthesizedExpression(node)||ts.isNonNullExpression(node))node=node.expression;
  return node;
}
function propName(prop:ts.ObjectLiteralElementLike):string|null{
  if(!ts.isPropertyAssignment(prop))return null;
  return ts.isIdentifier(prop.name)||ts.isStringLiteralLike(prop.name)?prop.name.text:null;
}
function getProp(node:ts.ObjectLiteralExpression,name:string):ts.Expression|null{
  for(const prop of node.properties)if(propName(prop)===name&&ts.isPropertyAssignment(prop))return prop.initializer;
  return null;
}
function literalString(node:ts.Expression|null):string{
  if(!node)return "";node=unwrap(node);return ts.isStringLiteralLike(node)?node.text.trim():"";
}
function hasArray(node:ts.Expression|null):boolean{
  if(!node)return false;node=unwrap(node);return ts.isArrayLiteralExpression(node)&&node.elements.length>0;
}
function hasObject(node:ts.Expression|null):boolean{
  if(!node)return false;node=unwrap(node);return ts.isObjectLiteralExpression(node)&&node.properties.length>0;
}
function collectFiles(root:string):string[]{
  if(!fs.existsSync(root))return[];const out:string[]=[];
  const walk=(dir:string)=>{for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    const full=path.join(dir,entry.name);if(entry.isDirectory())walk(full);else if(/\.(ts|tsx)$/.test(entry.name)&&!/\.test\.|\.spec\./.test(entry.name)&&!entry.name.includes("question-contract-enrichment"))out.push(full);
  }};walk(root);return out;
}
function familyFor(node:ts.ObjectLiteralExpression):Family|null{
  const stem=literalString(getProp(node,"stem"))||literalString(getProp(node,"question"))||literalString(getProp(node,"questionText"));
  const rationale=literalString(getProp(node,"rationale"))||literalString(getProp(node,"rationaleCorrect"))||literalString(getProp(node,"rationale_correct"))||literalString(getProp(node,"overallRationale"));
  const flatOptions=getProp(node,"options")||getProp(node,"answerOptions");
  const structuredPayload=hasArray(getProp(node,"rows"))||hasArray(getProp(node,"timepoints"))||hasArray(getProp(node,"questions"))||hasArray(getProp(node,"items"))||hasArray(getProp(node,"highlightSpans"))||hasArray(getProp(node,"centerOptions"));
  if(!stem && !rationale && !flatOptions && !structuredPayload)return null;

  const explicitCorrect=literalString(getProp(node,"correctAnswerExplanation"))||literalString(getProp(node,"correct_answer_explanation"));
  const explicitHint=literalString(getProp(node,"hint"))||literalString(getProp(node,"examStrategy"));
  const explicitWhy=literalString(getProp(node,"whyThisMatters"))||literalString(getProp(node,"keyTakeaway"));
  const explicitPearl=literalString(getProp(node,"clinicalPearl"))||literalString(getProp(node,"examPearl"));
  const explicitDistractors=hasObject(getProp(node,"distractorRationales"))||hasObject(getProp(node,"distractor_rationales"));
  if(explicitCorrect&&explicitHint&&explicitWhy&&explicitPearl&&explicitDistractors)return "explicit-v2";

  const rationaleCorrect=literalString(getProp(node,"rationaleCorrect"))||literalString(getProp(node,"rationale_correct"));
  const clinicalCorrelation=literalString(getProp(node,"clinicalCorrelation"))||literalString(getProp(node,"clinical_correlation"));
  if(rationaleCorrect&&clinicalCorrelation&&(hasArray(getProp(node,"rationaleIncorrect"))||hasArray(getProp(node,"rationale_incorrect"))))return "structured-bank-question";

  if(structuredPayload)return "advanced-structured";
  if(stem&&rationale&&flatOptions)return "legacy-flat-with-rationale";
  return "question-like-other";
}

const rows:Row[]=[];
for(const file of ROOTS.flatMap(collectFiles)){
  const source=fs.readFileSync(file,"utf8");const sf=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,file.endsWith(".tsx")?ts.ScriptKind.TSX:ts.ScriptKind.TS);let ordinal=0;
  const visit=(node:ts.Node)=>{
    if(ts.isObjectLiteralExpression(node)){
      ordinal++;const family=familyFor(node);if(family){
        const id=literalString(getProp(node,"id"))||literalString(getProp(node,"questionId"))||`source-${path.basename(file,path.extname(file))}-${ordinal}`;
        const tier=literalString(getProp(node,"tier"))||literalString(getProp(node,"servingTier"))||"allied";
        const questionType=literalString(getProp(node,"questionType"))||literalString(getProp(node,"question_type"))||literalString(getProp(node,"type"))||"unknown";
        const lc=sf.getLineAndCharacterOfPosition(node.getStart(sf));rows.push({id,file,line:lc.line+1,family,tier,questionType});
      }
    }
    ts.forEachChild(node,visit);
  };visit(sf);
}
const byFamily:Record<string,number>={};const byTier:Record<string,Record<string,number>>={};const byFile:Record<string,Record<string,number>>={};
for(const row of rows){
  byFamily[row.family]=(byFamily[row.family]||0)+1;
  byTier[row.tier]||={};byTier[row.tier][row.family]=(byTier[row.tier][row.family]||0)+1;
  byFile[row.file]||={};byFile[row.file][row.family]=(byFile[row.file][row.family]||0)+1;
}
const files=Object.entries(byFile).map(([file,families])=>({file,total:Object.values(families).reduce((a,b)=>a+b,0),families})).sort((a,b)=>b.total-a.total);
console.log(JSON.stringify({totalObjects:rows.length,byFamily,byTier,largestFiles:files.slice(0,100)},null,2));
