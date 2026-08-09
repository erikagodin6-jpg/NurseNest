import fs from "node:fs";
import path from "node:path";
import { QUESTION_SOURCE_QUARANTINE } from "../client/src/data/exam-questions/question-quarantine";
import { ADVANCED_MCQ_QUARANTINE } from "../client/src/data/exam-questions/advanced-mcq-quarantine";
import { rpnAdvancedVisualReplacements, rnAdvancedVisualReplacements, npAdvancedVisualReplacements } from "../client/src/data/exam-questions/advanced-visual-replacements";
import { rpnAdvancedStructuredReplacements, rnAdvancedStructuredReplacements, npAdvancedStructuredReplacements } from "../client/src/data/exam-questions/advanced-structured-replacements";
import { rpnAdvancedSataTrendReplacements, rnAdvancedSataTrendReplacements, npAdvancedSataTrendReplacements } from "../client/src/data/exam-questions/advanced-sata-trend-replacements";
import { rpnAdvancedOrderCaseReplacements, rnAdvancedOrderCaseReplacements, npAdvancedOrderCaseReplacements } from "../client/src/data/exam-questions/advanced-order-case-replacements";
import { rpnAdvancedMcqReplacements, rnAdvancedMcqReplacements, npAdvancedMcqReplacements } from "../client/src/data/exam-questions/advanced-mcq-replacements";

const authored=[
  ...rpnAdvancedVisualReplacements,...rnAdvancedVisualReplacements,...npAdvancedVisualReplacements,
  ...rpnAdvancedStructuredReplacements,...rnAdvancedStructuredReplacements,...npAdvancedStructuredReplacements,
  ...rpnAdvancedSataTrendReplacements,...rnAdvancedSataTrendReplacements,...npAdvancedSataTrendReplacements,
  ...rpnAdvancedOrderCaseReplacements,...rnAdvancedOrderCaseReplacements,...npAdvancedOrderCaseReplacements,
  ...rpnAdvancedMcqReplacements,...rnAdvancedMcqReplacements,...npAdvancedMcqReplacements,
];
const replacementIds=new Set(authored.map((q:any)=>String(q.id)));
const quarantine=[...QUESTION_SOURCE_QUARANTINE,...ADVANCED_MCQ_QUARANTINE];
const advancedIndex=fs.readFileSync(path.resolve("client/src/data/exam-questions/advanced-questions-index.ts"),"utf8");
const issues:Array<{path:string;code:string;detail:string}>=[];

for(const entry of quarantine){
  if(entry.replacementRequired)issues.push({path:entry.path,code:"replacement_still_required",detail:entry.note});
  if(!entry.replacementRequired&&(!entry.replacementIds||entry.replacementIds.length===0))issues.push({path:entry.path,code:"missing_replacement_ids",detail:"Resolved quarantine entry must name its replacement IDs."});
  for(const id of entry.replacementIds||[])if(!replacementIds.has(id))issues.push({path:entry.path,code:"replacement_id_not_found",detail:`Replacement ${id} is not present in the authored replacement banks.`});
  const base=path.basename(entry.path,".ts");
  const importPattern=new RegExp(`from\\s+["']\\./${base.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}["']`);
  if(importPattern.test(advancedIndex))issues.push({path:entry.path,code:"quarantined_source_still_served",detail:"Quarantined source is still imported by advanced-questions-index.ts."});
}

const duplicateReplacementIds=authored.map((q:any)=>String(q.id)).filter((id:string,index:number,all:string[])=>all.indexOf(id)!==index);
for(const id of new Set(duplicateReplacementIds))issues.push({path:"authored-replacements",code:"duplicate_replacement_id",detail:`Replacement ID ${id} is duplicated across authored banks.`});

console.log(JSON.stringify({quarantineEntries:quarantine.length,authoredReplacementQuestions:authored.length,replacementIds:[...replacementIds],blockingIssues:issues.length,issues},null,2));
if(issues.length)process.exitCode=2;
