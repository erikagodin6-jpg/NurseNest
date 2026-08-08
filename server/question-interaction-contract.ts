type JsonRecord = Record<string, any>;

export type CanonicalQuestionType =
  | "MCQ"
  | "SATA"
  | "ORDERED_RESPONSE"
  | "CLOZE"
  | "MATRIX"
  | "BOWTIE"
  | "TREND"
  | "NGN_CASE"
  | "CHART_REVIEW"
  | "ORDER_REVIEW";

export type InteractionIssue = { code: string; field: string; detail: string };

const ALIASES: Record<string, CanonicalQuestionType> = {
  MCQ:"MCQ", MULTIPLE_CHOICE:"MCQ", "MULTIPLE-CHOICE":"MCQ", SINGLE_CHOICE:"MCQ", "SINGLE-CHOICE":"MCQ",
  SATA:"SATA", SELECT_ALL_THAT_APPLY:"SATA", MULTI_SELECT:"SATA", MULTIPLE_RESPONSE:"SATA",
  ORDERED_RESPONSE:"ORDERED_RESPONSE", ORDERED:"ORDERED_RESPONSE", DRAG_DROP:"ORDERED_RESPONSE", DRAG_AND_DROP:"ORDERED_RESPONSE",
  CLOZE:"CLOZE", FILL_IN_BLANK:"CLOZE", DROPDOWN_CLOZE:"CLOZE", DRAG_DROP_CLOZE:"CLOZE",
  MATRIX:"MATRIX", MATRIX_SELECT:"MATRIX", MATRIX_SINGLE:"MATRIX", MATRIX_MULTI:"MATRIX", DROPDOWN_TABLE:"MATRIX",
  BOWTIE:"BOWTIE", BOW_TIE:"BOWTIE",
  TREND:"TREND", TREND_ANALYSIS:"TREND",
  NGN_CASE:"NGN_CASE", CASE_STUDY:"NGN_CASE", CASE_STUDY_SERIES:"NGN_CASE", NGN_CASE_STUDY:"NGN_CASE",
  CHART_REVIEW:"CHART_REVIEW", LAB_INTERPRETATION:"CHART_REVIEW",
  ORDER_REVIEW:"ORDER_REVIEW", MATCHING_GRID:"ORDER_REVIEW", MULTI_RESPONSE_GROUPING:"ORDER_REVIEW",
};

function norm(v: unknown): string { return String(v || "").trim().toUpperCase().replace(/[\s-]+/g,"_"); }
function text(v: unknown): string { return typeof v === "string" ? v.trim() : ""; }
function parse(v: unknown): any { if(typeof v!=="string")return v;try{return JSON.parse(v);}catch{return v;} }

export function canonicalQuestionType(raw: unknown): CanonicalQuestionType | null {
  return ALIASES[norm(raw)] || null;
}

export function usesFlatOptions(type: CanonicalQuestionType | null): boolean {
  return type === "MCQ" || type === "SATA" || type === "ORDERED_RESPONSE";
}

function stableId(obj: any): string {
  return text(obj?.id) || text(obj?.optionId) || text(obj?.option_id) || text(obj?.choiceId) || text(obj?.choice_id) || text(obj?.rowId) || text(obj?.row_id);
}

function checkChoiceArray(value: any, field: string, issues: InteractionIssue[], minimum = 1): string[] {
  const arr = parse(value);
  if(!Array.isArray(arr) || arr.length < minimum){issues.push({code:"missing_interaction_choices",field,detail:`${field} requires at least ${minimum} choice(s).`});return [];}
  const ids:string[]=[];
  arr.forEach((choice:any,index:number)=>{
    if(choice && typeof choice === "object"){
      const id=stableId(choice);
      const display=text(choice.text)||text(choice.label)||text(choice.content)||text(choice.value)||text(choice.name);
      if(!id)issues.push({code:"missing_interaction_choice_id",field:`${field}[${index}].id`,detail:"Every interactive choice requires a stable ID."});
      if(!display)issues.push({code:"missing_interaction_choice_text",field:`${field}[${index}]`,detail:"Every interactive choice requires display text/label."});
      if(id)ids.push(id);
    }else{
      issues.push({code:"positional_interaction_choice",field:`${field}[${index}]`,detail:"Primitive interactive choices are not canonical; use objects with stable IDs."});
    }
  });
  if(new Set(ids).size!==ids.length)issues.push({code:"duplicate_interaction_choice_id",field,detail:`${field} contains duplicate stable IDs.`});
  return ids;
}

function objectPayload(data: JsonRecord): JsonRecord {
  const raw = data.interactionPayload ?? data.interaction_payload ?? data.ngnPayload ?? data.ngn_payload ?? data.exhibitData ?? data.exhibit_data ?? data.payload;
  const parsed=parse(raw);
  return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
}

function validateMatrix(p:JsonRecord,issues:InteractionIssue[]){
  const rows=parse(p.rows); const columns=parse(p.columns);
  if(!Array.isArray(rows)||rows.length<2)issues.push({code:"invalid_matrix_rows",field:"interactionPayload.rows",detail:"Matrix requires at least two rows."});
  else rows.forEach((row:any,i:number)=>{if(!stableId(row))issues.push({code:"missing_matrix_row_id",field:`interactionPayload.rows[${i}].id`,detail:"Matrix row requires stable ID."});});
  if(!Array.isArray(columns)||columns.length<2)issues.push({code:"invalid_matrix_columns",field:"interactionPayload.columns",detail:"Matrix requires at least two columns."});
  else columns.forEach((col:any,i:number)=>{if(!stableId(col))issues.push({code:"missing_matrix_column_id",field:`interactionPayload.columns[${i}].id`,detail:"Matrix column requires stable ID."});});
  if(!p.answerKey && !p.answer_key && !p.correctAnswers && !p.correct_answers)issues.push({code:"missing_matrix_answer_contract",field:"interactionPayload.answerKey",detail:"Matrix requires a stable row/column answer contract."});
}

function validateBowtie(p:JsonRecord,issues:InteractionIssue[]){
  checkChoiceArray(p.conditionOptions ?? p.condition_options,"interactionPayload.conditionOptions",issues,2);
  checkChoiceArray(p.actionOptions ?? p.action_options,"interactionPayload.actionOptions",issues,2);
  checkChoiceArray(p.monitorOptions ?? p.monitor_options,"interactionPayload.monitorOptions",issues,2);
  const slots=parse(p.slots);
  if(!slots || (typeof slots!=="object" && !Array.isArray(slots)))issues.push({code:"missing_bowtie_slots",field:"interactionPayload.slots",detail:"Bow-Tie requires slot/cardinality metadata."});
}

function validateCloze(p:JsonRecord,issues:InteractionIssue[]){
  const template=text(p.textTemplate)||text(p.sentenceTemplate)||text(p.baseSentenceTemplate)||text(p.template)||text(p.passage);
  if(!template)issues.push({code:"missing_cloze_template",field:"interactionPayload.template",detail:"Cloze item requires a text/template payload."});
  const blanks=parse(p.blanks ?? p.dropdowns);
  if(!Array.isArray(blanks)||!blanks.length)issues.push({code:"missing_cloze_blanks",field:"interactionPayload.blanks",detail:"Cloze item requires at least one stable blank/dropdown definition."});
  else blanks.forEach((blank:any,i:number)=>{
    if(!stableId(blank))issues.push({code:"missing_cloze_blank_id",field:`interactionPayload.blanks[${i}].id`,detail:"Each blank requires stable ID."});
    checkChoiceArray(blank.options ?? blank.choices ?? blank.items,`interactionPayload.blanks[${i}].options`,issues,2);
  });
}

function validateTrend(p:JsonRecord,issues:InteractionIssue[]){
  const points=parse(p.timepoints ?? p.timePoints ?? p.timeline);
  if(!Array.isArray(points)||points.length<2)issues.push({code:"missing_trend_timepoints",field:"interactionPayload.timepoints",detail:"Trend item requires at least two timepoints."});
  else points.forEach((pt:any,i:number)=>{if(!stableId(pt)&&!text(pt?.timestamp)&&!text(pt?.time))issues.push({code:"missing_trend_timepoint_id",field:`interactionPayload.timepoints[${i}]`,detail:"Trend timepoint requires stable ID or immutable timestamp."});});
  const embedded=p.embeddedItem ?? p.embedded_item ?? p.question;
  if(!embedded)issues.push({code:"missing_trend_embedded_item",field:"interactionPayload.embeddedItem",detail:"Trend item requires its embedded decision question."});
}

function validateCase(p:JsonRecord,issues:InteractionIssue[]){
  const tabs=parse(p.tabs ?? p.exhibits);
  if(!Array.isArray(tabs)||!tabs.length)issues.push({code:"missing_case_exhibits",field:"interactionPayload.tabs",detail:"NGN case requires chart/exhibit tabs."});
  else tabs.forEach((tab:any,i:number)=>{if(!stableId(tab))issues.push({code:"missing_case_tab_id",field:`interactionPayload.tabs[${i}].id`,detail:"Every case tab/exhibit requires stable ID."});});
  const subs=parse(p.subQuestions ?? p.sub_questions ?? p.questions);
  if(!Array.isArray(subs)||subs.length<1)issues.push({code:"missing_case_subquestions",field:"interactionPayload.subQuestions",detail:"NGN case requires at least one subquestion."});
  else subs.forEach((q:any,i:number)=>{if(!stableId(q))issues.push({code:"missing_case_subquestion_id",field:`interactionPayload.subQuestions[${i}].id`,detail:"Every case subquestion requires stable ID."});});
}

function validateReview(p:JsonRecord,issues:InteractionIssue[]){
  const rows=p.rows ?? p.items ?? p.records ?? p.panel ?? p.chart;
  if(!rows)issues.push({code:"missing_review_payload",field:"interactionPayload",detail:"Review question requires chart/order/review payload."});
  const choices=p.options ?? p.choices ?? p.responses;
  if(choices)checkChoiceArray(choices,"interactionPayload.choices",issues,2);
}

export function validateInteractionContract(data:JsonRecord):InteractionIssue[]{
  const issues:InteractionIssue[]=[];
  const type=canonicalQuestionType(data.questionType ?? data.question_type);
  if(!type){issues.push({code:"unsupported_question_type",field:"question_type",detail:`Question type ${String(data.questionType ?? data.question_type ?? "<missing>")} is not in the certified renderer contract.`});return issues;}
  if(usesFlatOptions(type))return issues;
  const p=objectPayload(data);
  if(!Object.keys(p).length){issues.push({code:"missing_interaction_payload",field:"interactionPayload",detail:`${type} requires a structured interaction payload.`});return issues;}
  if(type==="MATRIX")validateMatrix(p,issues);
  else if(type==="BOWTIE")validateBowtie(p,issues);
  else if(type==="CLOZE")validateCloze(p,issues);
  else if(type==="TREND")validateTrend(p,issues);
  else if(type==="NGN_CASE")validateCase(p,issues);
  else if(type==="CHART_REVIEW"||type==="ORDER_REVIEW")validateReview(p,issues);
  return issues;
}
