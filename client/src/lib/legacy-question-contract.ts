import { QUESTION_CONTRACT_ENRICHMENT } from "../data/question-contract-enrichment";

export type LegacyContractOption = { id: string; text: string; label: string };

export type LegacyContractQuestion = Record<string, any> & {
  id: string;
  options: LegacyContractOption[];
  correctAnswer: string | string[];
  correctAnswerIds: string[];
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
  distractorMetadataOrigin?: "explicit" | "authored-rationale-extracted" | "mixed" | "derived-fallback";
  unitSystemSupport?: { supported: string[]; default?: string };
  unitVariants?: any[];
};

function text(v: unknown): string { return typeof v === "string" ? v.trim() : ""; }
function slug(v:string):string { return v.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,80); }
function hash(v:string):string { let h=0x811c9dc5; for(let i=0;i<v.length;i++){h^=v.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0;} return h.toString(16).padStart(8,"0"); }
function optionId(qid:string,index:number,value:string){return `${slug(qid)||"q"}:opt:${String(index+1).padStart(2,"0")}:${hash(value.toLowerCase().trim())}`;}
function firstSentence(value:string):string { const m=value.trim().match(/^(.+?[.!?])(?:\s|$)/); return (m?.[1] || value.trim()).slice(0,280); }
function substantive(value: unknown, min = 12): boolean { const v=text(value); return v.length>=min && !/^(?:tbd|todo|placeholder|n\/?a|none)$/i.test(v); }

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
  if(v&&typeof v==="object") for(const k of ["ids","answers","selected","correct","answer","id","value","index"]) if(k in v) return flatten(v[k]);
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

function mapDistractorArray(source:any, options:LegacyContractOption[], correct:Set<string>):Record<string,string>{
  if(!Array.isArray(source))return{};
  const out:Record<string,string>={};
  const incorrect=options.filter(option=>!correct.has(option.id));
  if(source.length===options.length){options.forEach((option,index)=>{if(!correct.has(option.id)&&substantive(source[index],12))out[option.id]=text(source[index]);});return out;}
  if(source.length===incorrect.length){incorrect.forEach((option,index)=>{if(substantive(source[index],12))out[option.id]=text(source[index]);});}
  return out;
}

const STOPWORDS=new Set(["the","a","an","and","or","of","to","in","on","for","with","without","is","are","be","being","this","that","these","those","patient","client","most","more","less","normal","increase","decrease","administer","start","apply","use","using","treatment","therapy"]);
function conceptTokens(value:string):string[]{
  const preserved=(value.match(/\b(?:PEEP|FiO2|PaCO2|PaO2|HCO3|BiPAP|CPAP|ECG|EKG|COHb|SvO2|ARDS|COPD|V\/Q|INR|IV|CO2|O2)\b/gi)||[]).map(v=>v.toLowerCase());
  const words=value.toLowerCase().replace(/[^a-z0-9+/.-]+/g," ").split(/\s+/).filter(w=>w.length>=4&&!STOPWORDS.has(w));
  return [...new Set([...preserved,...words])];
}
function rationaleSentences(value:string):string[]{
  return value.replace(/\s+/g," ").match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map(s=>s.trim()).filter(Boolean)||[];
}
function extractDistractorsFromCombinedRationale(rationale:string,options:LegacyContractOption[],correct:Set<string>):Record<string,string>{
  if(!substantive(rationale,40))return{};
  const sentences=rationaleSentences(rationale);
  const out:Record<string,string>={};
  for(const option of options){
    if(correct.has(option.id))continue;
    const tokens=conceptTokens(option.text);
    if(!tokens.length)continue;
    let best:""|string=""; let bestScore=0;
    for(const sentence of sentences){
      const lower=sentence.toLowerCase();
      let score=0;
      for(const token of tokens){
        if(lower.includes(token)) score += token.length>=6 ? 3 : 2;
      }
      const negativeCue=/\b(?:not|doesn['’]?t|wouldn['’]?t|incorrect|inappropriate|unnecessary|insufficient|worsen|contraindicated|rather than|instead|affect|treats?|addresses?|rules? out)\b/i.test(sentence);
      if(negativeCue)score+=2;
      if(score>bestScore){best=sentence;bestScore=score;}
    }
    if(bestScore>=4&&substantive(best,24))out[option.id]=best;
  }
  return out;
}

function explicitDistractors(raw:any, options:LegacyContractOption[], correct:Set<string>):Record<string,string>{
  return {
    ...mapDistractorArray(raw.rationaleIncorrect||raw.rationale_incorrect||raw.distractorExplanations,options,correct),
    ...mapDistractors(raw.distractorRationales||raw.distractor_rationales||raw.incorrectAnswerRationale||{}, options, correct),
  };
}

function authoredHintFromStructuredSource(raw:any,topic:string):string{
  const subtopic=text(raw.subtopic)||topic;
  const bloom=text(raw.bloomLevel).toLowerCase();
  if(bloom==="recall"||bloom==="remember") return `Recall the defining anatomical or physiologic feature of ${subtopic}, then match it directly to the option that uses that definition.`;
  if(bloom==="application"||bloom==="apply") return `Use the clinical cue in the stem and apply the ${subtopic} principle before choosing the option that best fits the scenario.`;
  if(bloom==="analysis"||bloom==="analyze") return `Compare the defining features of the options and use the ${subtopic} relationship that best explains the finding in the stem.`;
  return `Distinguish the defining features of ${subtopic}; choose the option that most precisely matches the concept asked in the stem.`;
}

export type JurisdictionHint={countryCode?:string;countryLabels?:string[];regionScope?:string;languageCode?:string;exam?:string;licensingBody?:string};

export function normalizeLegacyClientQuestion(raw:any,index:number,jurisdiction:JurisdictionHint={}):LegacyContractQuestion {
  const id=text(raw.id)||text(raw.questionId)||`legacy-${slug(jurisdiction.exam||raw.tier||"question")}-${String(index+1).padStart(6,"0")}`;
  const overlay=QUESTION_CONTRACT_ENRICHMENT[id]||{};
  const options=optionsFor(raw,id);
  const answerSource=raw.correctAnswerIds??raw.correct_answer_ids??raw.correctAnswers??raw.correctAnswer??raw.correct_answer??raw.correctOrder??raw.correctIndex??raw.correctIndices;
  const answers=resolveAnswers(answerSource,options);
  const correctSet=new Set(answers);
  const rationale=text(raw.rationale)||text(raw.rationaleCorrect)||text(raw.rationale_correct);
  const topic=text(raw.topic)||text(raw.subtopic)||text(raw.bodySystem)||text(raw.category)||text(raw.course)||"the tested concept";

  const structuredCorrect=text(raw.rationaleCorrect)||text(raw.rationale_correct);
  const authoredCorrect=text(overlay.correctAnswerExplanation)||text(raw.correctAnswerExplanation)||text(raw.correct_answer_explanation)||structuredCorrect;
  const correctAnswerExplanation=authoredCorrect||rationale;
  const structuredWhy=text(raw.clinicalCorrelation)||text(raw.clinical_correlation);
  const authoredHint=text(overlay.hint)||text(raw.hint)||text(raw.examStrategy)||text(raw.exam_strategy)||text(raw.examTip);
  const structuredSource=!!structuredCorrect&&Array.isArray(raw.rationaleIncorrect||raw.rationale_incorrect)&&!!structuredWhy;
  const hint=authoredHint||(structuredSource?authoredHintFromStructuredSource(raw,topic):`Focus on the ${topic} principle that most directly answers the stem; eliminate options that are true but lower priority or address a different problem.`);
  const authoredWhy=text(overlay.whyThisMatters)||text(raw.whyThisMatters)||text(raw.why_this_matters)||text(raw.keyTakeaway)||text(raw.key_takeaway)||structuredWhy||text(raw.clinicalConcept);
  const whyThisMatters=authoredWhy||(rationale?`This matters because the reasoning tested here affects safe, accurate decisions in ${topic}. ${firstSentence(rationale)}`:`This item matters because it tests a decision that can change safety or outcomes in ${topic}.`);
  const authoredPearl=text(overlay.clinicalPearl)||text(raw.clinicalPearl)||text(raw.clinical_pearl)||text(raw.examPearl)||text(raw.safetyPearl)||(structuredSource?firstSentence(structuredCorrect):"");
  const clinicalPearl=authoredPearl||(rationale?firstSentence(rationale):`Match the requested decision to the most specific ${topic} principle before choosing an adjacent fact.`);

  const explicit=explicitDistractors(raw,options,correctSet);
  const extracted=extractDistractorsFromCombinedRationale(rationale,options,correctSet);
  const overlayDistractors=mapDistractors(overlay.distractorRationales||{},options,correctSet);
  const authoredDistractors={...extracted,...explicit,...overlayDistractors};
  const distractorRationales={...authoredDistractors};
  let usedFallback=false;
  for(const option of options){
    if(correctSet.has(option.id)||distractorRationales[option.id])continue;
    usedFallback=true;
    distractorRationales[option.id]=rationale
      ? `${option.text} is not the keyed answer for this item. It does not satisfy the decision tested in the stem as directly as the keyed reasoning: ${firstSentence(rationale)}`
      : `${option.text} does not best satisfy the specific ${topic} decision requested in the stem; reassess the priority, mechanism, or criterion being tested.`;
  }

  const overlayAuthored=overlay.editorialStatus==="authored-v2";
  const explicitSourceAuthored=options.every(o=>!!o.id)&&answers.length>0&&!!text(raw.correctAnswerExplanation||raw.correct_answer_explanation)&&!!text(raw.hint||raw.examStrategy||raw.exam_strategy||raw.examTip)&&!!text(raw.whyThisMatters||raw.why_this_matters||raw.keyTakeaway||raw.key_takeaway||raw.clinicalConcept)&&!!text(raw.clinicalPearl||raw.clinical_pearl||raw.examPearl||raw.safetyPearl)&&Object.keys(explicit).length===Math.max(0,options.length-correctSet.size);
  const structuredSourceAuthored=structuredSource&&answers.length>0&&options.every(o=>!!o.id)&&Object.keys(explicit).length===Math.max(0,options.length-correctSet.size)&&substantive(correctAnswerExplanation,24)&&substantive(whyThisMatters,20)&&substantive(hint,12)&&substantive(clinicalPearl,12);
  const combinedRationaleFullyExplainsDistractors=!usedFallback&&options.filter(o=>!correctSet.has(o.id)).every(o=>substantive(authoredDistractors[o.id],24));
  const richCombinedAuthored=combinedRationaleFullyExplainsDistractors&&substantive(rationale,80)&&substantive(correctAnswerExplanation,24)&&!!(text(raw.examTip)||text(raw.safetyPearl)||text(raw.clinicalConcept));
  const authoredV2=answers.length>0&&options.every(o=>!!o.id)&&(overlayAuthored||explicitSourceAuthored||structuredSourceAuthored||richCombinedAuthored);
  const answerValue=answers.length===1?answers[0]:answers;
  const explicitCount=Object.keys(explicit).length+Object.keys(overlayDistractors).length;
  const extractedCount=Object.keys(extracted).filter(k=>!explicit[k]&&!overlayDistractors[k]).length;
  const distractorMetadataOrigin=usedFallback?"derived-fallback":explicitCount&&extractedCount?"mixed":extractedCount?"authored-rationale-extracted":"explicit";

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
    distractorMetadataOrigin,
  } as LegacyContractQuestion;
}

export function normalizeLegacyClientQuestions(rows:any[],jurisdiction:JurisdictionHint={}):LegacyContractQuestion[]{
  return rows.map((row,index)=>normalizeLegacyClientQuestion(row,index,jurisdiction));
}
