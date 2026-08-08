import { createHash } from "node:crypto";
import { pool } from "../server/storage";

type Row = Record<string, any>;

type Store = {
  table: string;
  id: string;
  stem: string;
  status?: string;
  tier?: string;
  exam?: string;
  country?: string;
};

const APPLY = process.argv.includes("--apply");
const RETIRE_PUBLIC = process.argv.includes("--retire-public");
const tableArg = process.argv.find(a=>a.startsWith("--table="));
const TABLE_ONLY = tableArg ? tableArg.split("=")[1] : null;

function qident(name:string){return `"${name.replace(/"/g,'""')}"`;}
function text(v:unknown){return typeof v === "string" ? v.trim() : "";}
function parse(v:unknown):any { if(typeof v!=="string") return v; try{return JSON.parse(v);}catch{return v;} }
function normalizeStem(v:string){return v.toLowerCase().replace(/<[^>]+>/g," ").replace(/[^a-z0-9.%°/+-]+/g," ").replace(/\s+/g," ").trim();}
function normalizeOption(v:string){return v.toLowerCase().replace(/[^a-z0-9.%°/+-]+/g," ").replace(/\s+/g," ").trim();}
function first(c:Set<string>, names:string[]){return names.find(n=>c.has(n));}

async function discover():Promise<Store[]> {
  const tables = await pool.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE' AND (table_name='exam_questions' OR table_name LIKE '%question%') ORDER BY table_name`);
  const out:Store[]=[];
  for(const {table_name:table} of tables.rows){
    if(TABLE_ONLY && table!==TABLE_ONLY) continue;
    const cr=await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name=$1`,[table]);
    const c=new Set<string>(cr.rows.map((r:any)=>r.column_name));
    if(!c.has("contract_options")||!c.has("contract_correct_answer_ids")||!c.has("contract_status")) continue;
    const id=first(c,["id","question_id","blueprint_id"]); const stem=first(c,["stem","question","question_text"]);
    if(!id||!stem) continue;
    out.push({table,id,stem,status:first(c,["status","publication_status"]),tier:first(c,["tier","serving_tier"]),exam:first(c,["exam","exam_tag","exam_type"]),country:first(c,["country_code","country"])});
  }
  return out;
}

function fingerprint(row:Row,s:Store):string {
  const options=parse(row.contract_options);
  const optionTexts=Array.isArray(options)?options.map((o:any)=>normalizeOption(text(o?.text)||text(o))).sort():[];
  const scope=[s.tier?text(row[s.tier]):"",s.exam?text(row[s.exam]):"",text(row.contract_country_code)||(s.country?text(row[s.country]):"")].map(x=>x.toLowerCase());
  const payload=[normalizeStem(text(row[s.stem])),...optionTexts,...scope].join("\u0001");
  return createHash("sha256").update(payload).digest("hex");
}

function richness(row:Row):number {
  let score=0;
  for(const k of ["contract_rationale","contract_correct_answer_explanation","contract_hint","contract_why_this_matters","contract_clinical_pearl","contract_country_code","contract_language_code"]){if(text(row[k])) score++;}
  const dr=parse(row.contract_distractor_rationales); if(dr&&typeof dr==="object") score+=Math.min(4,Object.keys(dr).length);
  if(row.contract_status==="verified") score+=10;
  return score;
}

function answerPosition(row:Row):number|null {
  const options=parse(row.contract_options); const answers=parse(row.contract_correct_answer_ids);
  if(!Array.isArray(options)||!Array.isArray(answers)||answers.length!==1) return null;
  const id=String(answers[0]); const idx=options.findIndex((o:any)=>text(o?.id)===id); return idx>=0?idx:null;
}

async function main(){
  const stores=await discover();
  const report:any={mode:APPLY?"apply":"audit",stores:{},totals:{rows:0,duplicateRows:0,clusters:0,retired:0,biasWarnings:0}};
  for(const s of stores){
    const rr=await pool.query(`SELECT * FROM ${qident(s.table)} WHERE contract_question_id IS NOT NULL ORDER BY ${qident(s.id)}`);
    const groups=new Map<string,Row[]>(); const pos=new Map<number,number>(); let single=0;
    for(const row of rr.rows){
      report.totals.rows++;
      const fp=fingerprint(row,s); const arr=groups.get(fp)||[]; arr.push(row); groups.set(fp,arr);
      const p=answerPosition(row); if(p!==null){single++;pos.set(p,(pos.get(p)||0)+1);}
    }
    const duplicates=[...groups.entries()].filter(([,rows])=>rows.length>1);
    const duplicateRows=duplicates.reduce((sum,[,rows])=>sum+rows.length-1,0);
    report.totals.duplicateRows+=duplicateRows; report.totals.clusters+=duplicates.length;

    let retired=0;
    const samples:any[]=[];
    for(const [fp,rows] of duplicates){
      const sorted=[...rows].sort((a,b)=>richness(b)-richness(a)||String(a[s.id]).localeCompare(String(b[s.id])));
      const canonical=sorted[0];
      for(const dup of sorted.slice(1)){
        samples.push({fingerprint:fp.slice(0,12),canonical:String(canonical[s.id]),duplicate:String(dup[s.id]),stem:text(dup[s.stem]).slice(0,160)});
        if(APPLY){
          const issues=parse(dup.contract_issues); const next=Array.isArray(issues)?issues:[];
          next.push({code:"duplicate_question",field:"stem",severity:"blocking",detail:`Duplicate of ${String(canonical[s.id])}`});
          await pool.query(`UPDATE ${qident(s.table)} SET contract_status='retired_duplicate', contract_issues=$1::jsonb, contract_verified_at=NOW() WHERE ${qident(s.id)}=$2`,[JSON.stringify(next),dup[s.id]]);
          if(RETIRE_PUBLIC && s.status && ["published","approved"].includes(text(dup[s.status]).toLowerCase())){
            await pool.query(`UPDATE ${qident(s.table)} SET ${qident(s.status)}=$1 WHERE ${qident(s.id)}=$2`,["archived",dup[s.id]]).catch(async()=>{
              await pool.query(`UPDATE ${qident(s.table)} SET ${qident(s.status)}=$1 WHERE ${qident(s.id)}=$2`,["draft",dup[s.id]]);
            });
          }
          retired++;
        }
      }
    }
    report.totals.retired+=retired;

    const distribution=Object.fromEntries([...pos.entries()].sort((a,b)=>a[0]-b[0]).map(([k,v])=>[String.fromCharCode(65+k),v]));
    const max=single?Math.max(...pos.values(),0):0; const maxShare=single?max/single:0;
    const biasWarning=single>=25 && maxShare>0.55;
    if(biasWarning) report.totals.biasWarnings++;
    report.stores[s.table]={rows:rr.rows.length,duplicateClusters:duplicates.length,duplicateRows,retired,singleAnswerQuestions:single,answerPositionDistribution:distribution,maxPositionShare:Number(maxShare.toFixed(4)),answerPositionBiasWarning:biasWarning,sampleDuplicates:samples.slice(0,50)};
  }
  console.log(JSON.stringify(report,null,2));
  if(report.totals.duplicateRows>0||report.totals.biasWarnings>0) process.exitCode=2;
}

main().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{try{await pool.end();}catch{}});
