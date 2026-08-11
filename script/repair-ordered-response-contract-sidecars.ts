import { pool } from "../server/storage";

const APPLY=process.argv.includes("--apply");
const TABLE_ONLY=process.argv.find(a=>a.startsWith("--table="))?.split("=")[1]||null;
function qi(v:string){return `"${v.replace(/"/g,'""')}"`;}
function parse(v:any){if(typeof v!=="string")return v;try{return JSON.parse(v);}catch{return v;}}
function text(v:any){return typeof v==="string"?v.trim():"";}
function flatten(v:any):any[]{const p=parse(v);if(Array.isArray(p))return p.flatMap(flatten);if(p&&typeof p==="object"){for(const k of["ids","answers","selected","correct","answer","id","value","index"])if(k in p)return flatten(p[k]);}return[p];}
function resolveOrdered(raw:any,options:any[]):string[]{const out:string[]=[];for(const value of flatten(raw)){
  if(value==null)continue;
  if(typeof value==="number"&&Number.isInteger(value)){const o=options[value]||(value>0?options[value-1]:undefined);if(o?.id)out.push(String(o.id));continue;}
  const needle=String(value).trim();if(!needle)continue;
  const o=options.find(x=>text(x?.id).toLowerCase()===needle.toLowerCase())||options.find(x=>text(x?.label).toLowerCase()===needle.toLowerCase())||options.find(x=>text(x?.text).toLowerCase()===needle.toLowerCase());
  if(o?.id)out.push(String(o.id));
}return out;}

async function columns(table:string){const r=await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name=$1`,[table]);return new Set<string>(r.rows.map((x:any)=>x.column_name));}
async function main(){
  const tr=await pool.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE' AND (table_name='exam_questions' OR table_name LIKE '%question%') ORDER BY table_name`);
  const report:any={mode:APPLY?"apply":"audit",tables:{},totals:{orderedRows:0,repaired:0,blocked:0}};
  for(const {table_name:table} of tr.rows){if(TABLE_ONLY&&table!==TABLE_ONLY)continue;const c=await columns(table);if(!c.has("contract_options")||!c.has("contract_correct_answer_ids")||!c.has("contract_status"))continue;
    const typeCol=["question_type","question_format","type"].find(k=>c.has(k));const idCol=["id","question_id","blueprint_id"].find(k=>c.has(k));const answerCol=["correct_answer","correct_order","correct_index","answer_key","correct"].find(k=>c.has(k));if(!typeCol||!idCol||!answerCol)continue;
    const rr=await pool.query(`SELECT * FROM ${qi(table)} WHERE upper(replace(replace(COALESCE(${qi(typeCol)}::text,''),'-','_'),' ','_')) IN ('ORDERED_RESPONSE','ORDERED','DRAG_DROP','DRAG_AND_DROP')`);
    const stat={orderedRows:0,repaired:0,blocked:0};
    for(const row of rr.rows){stat.orderedRows++;report.totals.orderedRows++;const opts=parse(row.contract_options);const sequence=Array.isArray(opts)?resolveOrdered(row[answerCol],opts):[];const unique=new Set(sequence);
      const issues:any[]=[];
      if(!Array.isArray(opts)||opts.length<2)issues.push({code:"invalid_options",field:"contract_options",severity:"blocking",detail:"Ordered-response options missing."});
      if(sequence.length!==opts?.length)issues.push({code:"incomplete_ordered_answer_sequence",field:"contract_correct_answer_ids",severity:"blocking",detail:"Ordered answer must include every option exactly once."});
      if(unique.size!==sequence.length)issues.push({code:"duplicate_ordered_answer_id",field:"contract_correct_answer_ids",severity:"blocking",detail:"Ordered answer sequence contains duplicate option IDs."});
      const unknown=sequence.some(id=>!opts.some((o:any)=>text(o?.id)===id));if(unknown)issues.push({code:"unknown_ordered_answer_id",field:"contract_correct_answer_ids",severity:"blocking",detail:"Ordered answer references an unknown option ID."});
      const status=issues.length?"blocked":row.contract_status==="quality_only"?"quality_only":"verified";
      if(issues.length){stat.blocked++;report.totals.blocked++;}
      if(APPLY){await pool.query(`UPDATE ${qi(table)} SET contract_correct_answer_ids=$1::jsonb, contract_status=$2, contract_issues=(COALESCE(contract_issues,'[]'::jsonb) || $3::jsonb), contract_verified_at=NOW() WHERE ${qi(idCol)}=$4`,[JSON.stringify(sequence),status,JSON.stringify(issues),row[idCol]]);stat.repaired++;report.totals.repaired++;}
    }
    report.tables[table]=stat;
  }
  console.log(JSON.stringify(report,null,2));
  if(report.totals.blocked)process.exitCode=2;
}
main().catch(e=>{console.error("[ordered-contract-repair]",e);process.exitCode=1;}).finally(async()=>{try{await pool.end();}catch{}});
