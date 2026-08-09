import { validateAllQuestionUnitVariants } from "./question-unit-conversion";
import { canonicalQuestionType, usesFlatOptions, validateInteractionContract } from "./question-interaction-contract";

type JsonRecord = Record<string, unknown>;

export type CanonicalOption = { id: string; text: string; label?: string };
export type UnitVariant = {
  token: string;
  quantity: string;
  si: { value: number | string; unit: string; display: string };
  conv: { value: number | string; unit: string; display: string };
};

export type QuestionContractInput = {
  id?: unknown; tier?: unknown; exam?: unknown; questionType?: unknown; question_type?: unknown;
  stem?: unknown; options?: unknown; correctAnswer?: unknown; correct_answer?: unknown;
  interactionPayload?: unknown; interaction_payload?: unknown; ngnPayload?: unknown; ngn_payload?: unknown; exhibitData?: unknown; exhibit_data?: unknown; payload?: unknown;
  rationale?: unknown; distractorRationales?: unknown; distractor_rationales?: unknown;
  correctAnswerExplanation?: unknown; correct_answer_explanation?: unknown;
  hint?: unknown; examStrategy?: unknown; exam_strategy?: unknown;
  whyThisMatters?: unknown; why_this_matters?: unknown; keyTakeaway?: unknown; key_takeaway?: unknown;
  clinicalPearl?: unknown; clinical_pearl?: unknown; mnemonic?: unknown; memoryHook?: unknown; memory_hook?: unknown;
  countryCode?: unknown; country_code?: unknown; countryLabels?: unknown; country_labels?: unknown; regionScope?: unknown; region_scope?: unknown;
  licensingBody?: unknown; licensing_body?: unknown; languageCode?: unknown; language_code?: unknown;
  unitSystemSupport?: unknown; unit_system_support?: unknown; unitVariants?: unknown; unit_variants?: unknown; labUnitVariant?: unknown; lab_unit_variant?: unknown;
  tags?: unknown; bodySystem?: unknown; body_system?: unknown; topic?: unknown; difficulty?: unknown;
  isAdaptiveEligible?: unknown; is_adaptive_eligible?: unknown;
};

export type QuestionContractIssue = { code: string; field: string; severity: "blocking" | "quality"; detail: string };

const PLACEHOLDER = /^(?:tbd|todo|placeholder|n\/?a|none|coming soon|rationale here|add rationale|see rationale|explanation|to be added|to be determined|not available|-+|\.+)$/i;
const ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{2,}$/;
const COUNTRY_PATTERN = /^[A-Z]{2,3}$/;

function parseJson(value: unknown): unknown {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return value;
  try { return JSON.parse(trimmed); } catch { return value; }
}
function text(value: unknown): string { return typeof value === "string" ? value.trim() : ""; }
function substantive(value: unknown, min = 12): boolean { const v=text(value); return v.length>=min && !PLACEHOLDER.test(v); }
function pick(data: QuestionContractInput, ...keys: (keyof QuestionContractInput)[]): unknown {
  for (const key of keys) { const value=data[key]; if (value!==undefined && value!==null && value!=="") return value; }
  return undefined;
}
function normalizeOptions(raw: unknown): CanonicalOption[] {
  const parsed=parseJson(raw); if(!Array.isArray(parsed))return [];
  return parsed.map((option,index)=>{
    if(typeof option==="string"||typeof option==="number")return{id:"",text:String(option).trim(),label:String.fromCharCode(65+index)};
    const obj=option&&typeof option==="object"?option as JsonRecord:{};
    return{id:text(obj.id)||text(obj.optionId)||text(obj.option_id),text:text(obj.text)||text(obj.content)||text(obj.value),label:text(obj.label)||String.fromCharCode(65+index)};
  });
}
function flattenAnswer(raw: unknown): unknown[] {
  const parsed=parseJson(raw); if(Array.isArray(parsed))return parsed.flatMap(flattenAnswer);
  if(parsed&&typeof parsed==="object"){const obj=parsed as JsonRecord;for(const key of ["ids","answers","selected","correct","answer","id","value","index"]){if(key in obj)return flattenAnswer(obj[key]);}}
  return[parsed];
}
function resolveAnswerIdList(raw: unknown, options: CanonicalOption[]): string[] {
  const ids:string[]=[];
  for(const rawValue of flattenAnswer(raw)){
    if(rawValue===null||rawValue===undefined)continue;
    const value=String(rawValue).trim(); if(!value)continue;
    const byId=options.find(o=>o.id&&o.id.toLowerCase()===value.toLowerCase()); if(byId){ids.push(byId.id);continue;}
    const byLabel=options.find(o=>o.label?.toLowerCase()===value.toLowerCase()); if(byLabel?.id){ids.push(byLabel.id);continue;}
    const byText=options.find(o=>o.text.toLowerCase()===value.toLowerCase()); if(byText?.id){ids.push(byText.id);continue;}
    const numeric=Number(value); if(Number.isInteger(numeric)){const byIndex=options[numeric]||(numeric>0?options[numeric-1]:undefined);if(byIndex?.id)ids.push(byIndex.id);}
  }
  return ids;
}
function resolveAnswerIds(raw: unknown, options: CanonicalOption[]): Set<string> {
  return new Set(resolveAnswerIdList(raw,options));
}
function rationaleMap(raw: unknown): Record<string,string> {
  const parsed=parseJson(raw); if(!parsed||typeof parsed!=="object"||Array.isArray(parsed))return{};
  return Object.fromEntries(Object.entries(parsed as JsonRecord).map(([key,value])=>[key,text(value)]));
}
function hasRationale(map:Record<string,string>,option:CanonicalOption,index:number):boolean{
  const aliases=[option.id,option.label||"",String(index),String(index+1),option.text].filter(Boolean);
  for(const alias of aliases){const exact=map[alias];if(substantive(exact,24))return true;const found=Object.keys(map).find(key=>key.toLowerCase()===alias.toLowerCase());if(found&&substantive(map[found],24))return true;}
  return false;
}
function normalizeUnitSupport(data:QuestionContractInput):{support:string[];variants:UnitVariant[]}{
  const supportRaw=parseJson(pick(data,"unitSystemSupport","unit_system_support","labUnitVariant","lab_unit_variant"));
  const variantsRaw=parseJson(pick(data,"unitVariants","unit_variants")); let support:string[]=[];
  if(Array.isArray(supportRaw))support=supportRaw.map(String).map(v=>v.toUpperCase());
  else if(supportRaw&&typeof supportRaw==="object"){const supported=(supportRaw as JsonRecord).supported;if(Array.isArray(supported))support=supported.map(String).map(v=>v.toUpperCase());}
  else if(typeof supportRaw==="string")support=supportRaw.split(/[|,\/]/).map(v=>v.trim().toUpperCase()).filter(Boolean);
  return{support,variants:Array.isArray(variantsRaw)?variantsRaw as UnitVariant[]:[]};
}
function countryLabels(data:QuestionContractInput):string[]{
  const raw=parseJson(pick(data,"countryLabels","country_labels"));
  return Array.isArray(raw)?raw.map(String).map(v=>v.trim()).filter(Boolean):[];
}
function normalizedOptionText(value:string):string{return value.toLowerCase().replace(/\s+/g," ").replace(/[.!?,;:]+$/g,"").trim();}
function interactionPayload(data:QuestionContractInput):unknown{return pick(data,"interactionPayload","interaction_payload","ngnPayload","ngn_payload","exhibitData","exhibit_data","payload");}
function textFromUnknown(value:unknown):string{
  if(typeof value==="string")return value;
  try{return JSON.stringify(value||"");}catch{return "";}
}

export function auditQuestionPublicationContract(data:QuestionContractInput):QuestionContractIssue[]{
  const issues:QuestionContractIssue[]=[];
  const add=(code:string,field:string,severity:"blocking"|"quality",detail:string)=>issues.push({code,field,severity,detail});

  const id=text(data.id); if(!id||!ID_PATTERN.test(id))add("unstable_question_id","id","blocking","Question requires a persistent stable id; array position or transient labels are not acceptable identifiers.");
  if(!substantive(data.tier,2))add("missing_tier","tier","blocking","Serving tier/role is required.");
  const canonicalType=canonicalQuestionType(pick(data,"questionType","question_type"));
  if(!canonicalType){add("unsupported_question_type","question_type","blocking",`Question type ${String(pick(data,"questionType","question_type")||"<missing>")} is not in the certified renderer contract.`);}

  let options:CanonicalOption[]=[];
  let correctIds=new Set<string>();
  if(usesFlatOptions(canonicalType)){
    options=normalizeOptions(data.options);
    if(options.length<2)add("invalid_options","options","blocking","Question has fewer than two renderable options.");
    if(canonicalType==="MCQ"&&options.length<4)add("insufficient_mcq_distractors","options","blocking","Single-answer MCQs require at least four options so the item has three real distractors.");
    const optionIds=options.map(o=>o.id).filter(Boolean);
    if(options.some(o=>!o.id))add("missing_option_ids","options[].id","blocking","Every answer option requires a stable option id so shuffle order cannot affect grading or rationale lookup.");
    if(new Set(optionIds).size!==optionIds.length)add("duplicate_option_ids","options[].id","blocking","Option ids must be unique within the question.");
    if(options.some(o=>!substantive(o.text,1)))add("empty_option_text","options[].text","blocking","Every option requires display text.");
    const optionTexts=options.map(o=>normalizedOptionText(o.text)).filter(Boolean);
    if(new Set(optionTexts).size!==optionTexts.length)add("duplicate_distractor_text","options[].text","blocking","Answer options must be textually distinct; duplicate distractors are not valid assessment content.");

    const answerList=resolveAnswerIdList(pick(data,"correctAnswer","correct_answer"),options);
    correctIds=new Set(answerList);
    if(options.length>0&&answerList.length===0)add("unstable_or_unresolved_answer_contract","correct_answer","blocking","Correct answer must resolve to stable option ids; labels/indexes may be accepted only for legacy migration, not the canonical stored contract.");
    if(canonicalType==="MCQ"&&correctIds.size!==1)add("invalid_single_answer_cardinality","correct_answer","blocking","Single-answer MCQs require exactly one keyed option ID.");
    if(canonicalType==="SATA"&&correctIds.size<1)add("missing_sata_answer_contract","correct_answer","blocking","SATA requires at least one stable keyed option ID.");
    if(canonicalType==="ORDERED_RESPONSE"){
      if(answerList.length<2)add("missing_ordered_answer_contract","correct_answer","blocking","Ordered-response items require an ordered stable-ID sequence with at least two items.");
      if(answerList.length!==options.length)add("incomplete_ordered_answer_sequence","correct_answer","blocking","Ordered-response answer sequence must include every displayed item exactly once.");
      if(new Set(answerList).size!==answerList.length)add("duplicate_ordered_answer_id","correct_answer","blocking","Ordered-response answer sequence cannot repeat an option ID.");
    }

    if(canonicalType!=="ORDERED_RESPONSE"){
      const distractors=rationaleMap(pick(data,"distractorRationales","distractor_rationales"));
      options.forEach((option,index)=>{if(option.id&&!correctIds.has(option.id)&&!hasRationale(distractors,option,index))add("missing_distractor_rationale",`distractor_rationales.${option.id}`,"blocking",`Incorrect option ${option.id} requires its own substantive rationale.`);});
    }
  }else if(canonicalType){
    const interactionIssues=validateInteractionContract({...(data as JsonRecord),interactionPayload:interactionPayload(data)});
    interactionIssues.forEach(issue=>add(issue.code,issue.field,"blocking",issue.detail));
  }

  if(!substantive(data.stem,10))add("missing_stem","stem","blocking","Stem is missing or too short.");
  if(!substantive(data.rationale,40))add("missing_rationale","rationale","blocking","Overall teaching rationale is missing or too weak.");
  if(!substantive(pick(data,"correctAnswerExplanation","correct_answer_explanation"),24))add("missing_correct_answer_explanation","correct_answer_explanation","blocking","Correct answer explanation is required.");

  const countryCode=text(pick(data,"countryCode","country_code")).toUpperCase();
  const regionScope=text(pick(data,"regionScope","region_scope")).toUpperCase();
  const labels=countryLabels(data);
  if(!COUNTRY_PATTERN.test(countryCode)&&!["BOTH","GLOBAL","INTL"].includes(regionScope))add("missing_country_scope","country_code","blocking","Question requires an explicit country code or an explicit global/both region scope.");
  if(regionScope==="BOTH"&&!COUNTRY_PATTERN.test(countryCode)&&labels.length<2)add("missing_country_labels","country_labels","blocking","BOTH/multi-country content must name the supported countries so jurisdiction rendering is explicit.");
  if(!substantive(data.exam,2))add("missing_exam","exam","blocking","Exam/pathway label is required.");
  if(!substantive(pick(data,"licensingBody","licensing_body"),2)&&!["GLOBAL","INTL"].includes(regionScope))add("missing_licensing_body","licensing_body","quality","Licensing/certification body should be explicit when the pathway has one.");
  if(!substantive(pick(data,"languageCode","language_code"),2))add("missing_language_code","language_code","blocking","Language code is required for localization, spelling, and jurisdiction-safe rendering.");

  if(!substantive(pick(data,"hint","examStrategy","exam_strategy"),12))add("missing_hint","hint","blocking","A concise learner hint/exam strategy is required for tutor mode.");
  if(!substantive(pick(data,"whyThisMatters","why_this_matters","keyTakeaway","key_takeaway"),20))add("missing_why_this_matters","why_this_matters","blocking","Why This Matters must connect the item to clinical or professional significance.");
  if(!substantive(pick(data,"clinicalPearl","clinical_pearl"),12))add("missing_clinical_pearl","clinical_pearl","blocking","A high-yield clinical/exam pearl is required.");
  const mnemonic=pick(data,"mnemonic","memoryHook","memory_hook"); if(mnemonic!==undefined&&mnemonic!==null&&text(mnemonic)&&!substantive(mnemonic,6))add("weak_mnemonic","mnemonic","quality","Mnemonic/memory hook exists but is too weak or placeholder-like.");

  if(!substantive(pick(data,"bodySystem","body_system"),2))add("missing_body_system","body_system","blocking","Body system/category metadata is required.");
  if(!substantive(data.topic,2))add("missing_topic","topic","blocking","Topic metadata is required.");
  const tags=parseJson(data.tags); if(!Array.isArray(tags)||tags.filter(Boolean).length===0)add("missing_tags","tags","blocking","At least one tag is required.");
  const difficulty=Number(data.difficulty); if(!Number.isInteger(difficulty)||difficulty<1||difficulty>4)add("invalid_difficulty","difficulty","blocking","Difficulty must be an integer from 1 through 4.");

  const contentForUnits=[text(data.stem),...options.map(o=>o.text),textFromUnknown(interactionPayload(data))].join(" ");
  const looksConvertible=/(?:\bmg\/dL\b|\bmmol\/L\b|°F|°C|\blb\b|\bkg\b|\binches?\b|\bcm\b|\bfeet\b|\bft\b|\bmeters?\b)/i.test(contentForUnits);
  const {support,variants}=normalizeUnitSupport(data);
  if(looksConvertible){
    const hasSI=support.includes("SI")||variants.some(v=>v?.si?.display); const hasConv=support.includes("CONV")||support.includes("CONVENTIONAL")||variants.some(v=>v?.conv?.display);
    if(!hasSI||!hasConv)add("missing_si_conv_support","unit_system_support","blocking","Questions containing convertible measurements require both SI and conventional renderings.");
    if(variants.length===0)add("missing_unit_variants","unit_variants","blocking","Convertible values require structured SI/CONV variants tied to one semantic token so unit switching cannot change grading.");
    for(const [index,variant] of variants.entries())if(!substantive(variant?.token,2)||!substantive(variant?.quantity,2)||!substantive(variant?.si?.display,2)||!substantive(variant?.conv?.display,2))add("malformed_unit_variant",`unit_variants[${index}]`,"blocking","Every unit variant needs a stable token, quantity, SI display, and conventional display.");
    validateAllQuestionUnitVariants(variants).forEach((result,index)=>{if(!result.valid)add(result.reason==="unsupported_conversion_pair"?"unsupported_unit_conversion":"invalid_unit_conversion",`unit_variants[${index}]`,"blocking",result.reason==="unsupported_conversion_pair"?"This SI/CONV pair is not in the deterministic conversion registry and requires editorial verification before publication.":`SI/CONV values are not mathematically equivalent (${result.reason||"conversion mismatch"}).`);});
  }

  return issues;
}

export function isPublicationReady(data:QuestionContractInput):boolean{return !auditQuestionPublicationContract(data).some(issue=>issue.severity==="blocking");}
