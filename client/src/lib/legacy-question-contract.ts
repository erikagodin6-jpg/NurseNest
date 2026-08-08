import { QUESTION_CONTRACT_ENRICHMENT } from "../data/question-contract-enrichment.generated";

export type LegacyContractOption = { id: string; text: string; label: string };

export type LegacyContractQuestion = Record<string, any> & {
  id: string;
  options: LegacyContractOption[];
  correctAnswer: string | string[];
  distractorRationales: Record<string, string>;
  correctAnswerExplanation: string;
  hint: string;
  whyThisMatters: string;
  clinicalPearl: string;
  mnemonic?: string;
  countryCode?: string;
  countryLabels?: string[];
  regionScope: string;
  languageCode: string;
  optionContractVersion: 2;
  publicationContractVersion: 2;
  metadataOrigin: "authored-v2" | "legacy-derived";
  unitSystemSupport?: { supported: string[]; default?: string };
  unitVariants?: any[];
};

function text(v: unknown): string { return typeof v === "string" ? v.trim() : ""; }
function slug(v:string):string { return v.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,80); }
function hash(v:string):string {
  let h=0x811c9dc5;
  for(let i=0;i<v.length;i++){h^=v.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0;}
  return h.toString(16).padStart(8,"0");
}
function optionId(qid:string,index:number,value:string){return `${slug(qid)||"q"}:opt:${String(index+1).padStart(2,"0")}:${hash(value.toLowerCase().trim())}`;}
function firstSentence(value:string):string {
  const m=value.trim().match(/^(.+?[.!?])(?:\s|$)/); return (m?.[1] || value.trim()).slice(0,280);
}

function optionsFor(raw:any, qid:string):LegacyContractOption[] {
  const source=Array.isArray(raw.options)?raw.options:Array.isArray(raw.answerOptions)?raw.answerOptions:[];
  return source.map((o:any,i:number)=>{
    const label=String.fromCharCode(65+i);
    if(o&&typeof o==="object"){
      const value=text(o.text)||text(o.content)||text(o.value)||String(o.label||"");
      return {id:text(o.id)||text(o.optionId)||text(o.option_id)||optionId(qid,i,value),text:value,label:text(o.label)||label};
    }
    const value=String(o??"").trim();
    return {id:optionId(qid,i,value),text:value,label};
  }).filter((o:LegacyContractOption)=>o.text);
}

function flatten(v:any):any[]{
  if(Array.isArray(v)) return v.flatMap(flatten);
  if(v&&typeof v==="object"){
    for(const k of ["ids","answers","selected","correct","answer","id","value","index"]) if(k in v) return flatten(v[k]);
  }
  return [v];
}
function resolveAnswers(raw:any, options:LegacyContractOption[]):string[]{
  const out:string[]=[];
  for(const v of flatten(raw)){
    if(v===null||v===undefined) continue;
    if(typeof v==="number"&&Number.isInteger(v)){const o=options[v]||(v>0?options[v-1]:undefined);if(o)out.push(o.id);continue;}
    const n=String(v).trim(); if(!n) continue;
    const o=options.find(x=>x.id.toLowerCase()===n.toLowerCase())||options.find(x=>x.label.toLowerCase()===n.toLowerCase())||options.find(x=>x.text.toLowerCase()===n.toLowerCase());
    if(o)out.push(o.id);
  }
  return [...new Set(out)];
}

function mapDistractors(source:any, options:LegacyContractOption[], correct:Set<string>):Record<string,string>{
  const out:Record<string,string>={};
  if(source&&typeof source==="object"&&!Array.isArray(source)){
    for(const [k,v] of Object.entries(source)){
      const rat=text(v);if(!rat)continue;
      const num=Number(k);
      const o=options.find(x=>x.id.toLowerCase()===k.toLowerCase())||options.find(x=>x.label.toLowerCase()===k.toLowerCase())||(Number.isInteger(num)?options[num]||(num>0?options[num-1]:undefined):undefined)||options.find(x=>x.text.toLowerCase()===k.toLowerCase());
      if(o&&!correct.has(o.id))out[o.id]=rat;
    }
  }
  return out;
}

function existingDistractors(raw:any, options:LegacyContractOption[], correct:Set<string>):Record<string,string>{
  return mapDistractors(raw.distractorRationales||raw.distractor_rationales||raw.incorrectAnswerRationale||{}, options, correct);
}

export type JurisdictionHint={countryCode?:string;countryLabels?:string[];regionScope?:string;languageCode?:string;exam?:string;licensingBody?:string};

export function normalizeLegacyClientQuestion(raw:any,index:number,jurisdiction:JurisdictionHint={}):LegacyContractQuestion {
  const id=text(raw.id)||text(raw.questionId)||`legacy-${slug(jurisdiction.exam||raw.tier||"question")}-${String(index+1).padStart(6,"0")}`;
  const overlay=QUESTION_CONTRACT_ENRICHMENT[id]||{};
  const options=optionsFor(raw,id);
  const answerSource=raw.correctAnswerIds??raw.correct_answer_ids??raw.correctAnswer??raw.correct_answer??raw.correctIndex??raw.correctIndices;
  const answers=resolveAnswers(answerSource,options);
  const correctSet=new Set(answers);
  const rationale=text(raw.rationale)||text(raw.rationaleCorrect)||text(raw.rationale_correct);

  const authoredCorrect=text(overlay.correctAnswerExplanation)||text(raw.correctAnswerExplanation)||text(raw.correct_answer_explanation);
  const correctAnswerExplanation=authoredCorrect||rationale;
  const authoredHint=text(overlay.hint)||text(raw.hint)||text(raw.examStrategy)||text(raw.exam_strategy);
  const topic=text(raw.topic)||text(raw.subtopic)||text(raw.bodySystem)||text(raw.category)||"the tested concept";
  const hint=authoredHint||`Focus on the ${topic} principle that most directly answers the stem; eliminate options that are true but lower priority or address a different problem.`;
  const authoredWhy=text(overlay.whyThisMatters)||text(raw.whyThisMatters)||text(raw.why_this_matters)||text(raw.keyTakeaway)||text(raw.key_takeaway);
  const whyThisMatters=authoredWhy||(rationale?`This matters because the reasoning tested here affects safe, accurate decisions in ${topic}. ${firstSentence(rationale)}`:`This item matters because it tests a decision that can change safety or outcomes in ${topic}.`);
  const authoredPearl=text(overlay.clinicalPearl)||text(raw.clinicalPearl)||text(raw.clinical_pearl)||text(raw.examPearl);
  const clinicalPearl=authoredPearl||(rationale?firstSentence(rationale):`Match the requested decision to the most specific ${topic} principle before choosing an adjacent fact.`);

  const sourceDistractors=existingDistractors(raw,options,correctSet);
  const overlayDistractors=mapDistractors(overlay.distractorRationales||{},options,correctSet);
  const distractorRationales={...sourceDistractors,...overlayDistractors};
  for(const option of options){
    if(correctSet.has(option.id)||distractorRationales[option.id])continue;
    distractorRationales[option.id]=rationale
      ? `${option.text} is not the keyed answer for this item. It does not satisfy the decision tested in the stem as directly as the keyed reasoning: ${firstSentence(rationale)}`
      : `${option.text} does not best satisfy the specific ${topic} decision requested in the stem; reassess the priority, mechanism, or criterion being tested.`;
  }

  const overlayAuthored=overlay.editorialStatus==="authored-v2";
  const sourceAuthored=options.every(o=>!!o.id)&&answers.length>0&&!!text(raw.correctAnswerExplanation||raw.correct_answer_explanation)&&!!text(raw.hint||raw.examStrategy||raw.exam_strategy)&&!!text(raw.whyThisMatters||raw.why_this_matters||raw.keyTakeaway||raw.key_takeaway)&&!!text(raw.clinicalPearl||raw.clinical_pearl||raw.examPearl)&&Object.keys(sourceDistractors).length===Math.max(0,options.length-correctSet.size);
  const authoredV2=answers.length>0&&options.every(o=>!!o.id)&&(overlayAuthored||sourceAuthored);
  const answerValue=answers.length===1?answers[0]:answers;

  return {
    ...raw,
    id,
    options,
    correctAnswer:answerValue,
    correctAnswerIds:answers,
    distractorRationales,
    correctAnswerExplanation,
    hint,
    whyThisMatters,
    clinicalPearl,
    mnemonic:text(overlay.mnemonic)||text(raw.mnemonic)||text(raw.memoryHook)||undefined,
    countryCode:text(overlay.countryCode)||text(raw.countryCode)||text(raw.country_code)||jurisdiction.countryCode,
    countryLabels:Array.isArray(raw.countryLabels)?raw.countryLabels:jurisdiction.countryLabels,
    regionScope:text(overlay.regionScope)||text(raw.regionScope)||text(raw.region_scope)||jurisdiction.regionScope||"GLOBAL",
    languageCode:text(overlay.languageCode)||text(raw.languageCode)||text(raw.language_code)||jurisdiction.languageCode||"en",
    exam:text(raw.exam)||jurisdiction.exam||raw.exam,
    licensingBody:text(overlay.licensingBody)||text(raw.licensingBody)||text(raw.licensing_body)||jurisdiction.licensingBody,
    unitSystemSupport:overlay.unitSystemSupport||raw.unitSystemSupport||raw.unit_system_support,
    unitVariants:overlay.unitVariants||raw.unitVariants||raw.unit_variants,
    optionContractVersion:2,
    publicationContractVersion:2,
    metadataOrigin:authoredV2?"authored-v2":"legacy-derived",
  } as LegacyContractQuestion;
}

export function normalizeLegacyClientQuestions(rows:any[],jurisdiction:JurisdictionHint={}):LegacyContractQuestion[]{
  return rows.map((row,index)=>normalizeLegacyClientQuestion(row,index,jurisdiction));
}
