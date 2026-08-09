import fs from "node:fs";
import path from "node:path";
import { QUESTION_SOURCE_QUARANTINE } from "../client/src/data/exam-questions/question-quarantine";
import { rpnAdvancedVisualReplacements, rnAdvancedVisualReplacements, npAdvancedVisualReplacements } from "../client/src/data/exam-questions/advanced-visual-replacements";

const replacementIds=new Set([...rpnAdvancedVisualReplacements,...rnAdvancedVisualReplacements,...npAdvancedVisualReplacements].map((q:any)=>String(q.id)));
const advancedIndex=fs.readFileSync(path.resolve("client/src/data/exam-questions/advanced-questions-index.ts"),"utf8");
const issues:Array<{path:string;code:string;detail:string}>=[];
for(const entry of QUESTION_SOURCE_QUARANTINE){
  if(entry.replacementRequired)issues.push({path:entry.path,code:"replacement_still_required",detail:entry.note});
  if(!entry.replacementRequired&&(!entry.replacementIds||entry.replacementIds.length===0))issues.push({path:entry.path,code:"missing_replacement_ids",detail:"Resolved quarantine entry must name its replacement IDs."});
  for(const id of entry.replacementIds||[])if(!replacementIds.has(id))issues.push({path:entry.path,code:"replacement_id_not_found",detail:`Replacement ${id} is not present in the authored replacement bank.`});
  const base=path.basename(entry.path,".ts");
  const importPattern=new RegExp(`from\\s+["']\\./${base.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}["']`);
  if(importPattern.test(advancedIndex))issues.push({path:entry.path,code:"quarantined_source_still_served",detail:"Quarantined source is still imported by advanced-questions-index.ts."});
}
console.log(JSON.stringify({quarantineEntries:QUESTION_SOURCE_QUARANTINE.length,replacementIds:[...replacementIds],blockingIssues:issues.length,issues},null,2));
if(issues.length)process.exitCode=2;
