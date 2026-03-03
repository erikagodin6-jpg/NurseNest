export type NGNQuestionType =
  | "DRAG_DROP_CLOZE"
  | "DRAG_DROP_RATIONALE"
  | "DROPDOWN_CLOZE"
  | "DROPDOWN_RATIONALE"
  | "DROPDOWN_TABLE"
  | "MATRIX_SINGLE"
  | "MATRIX_MULTI"
  | "MULTI_RESPONSE_GROUPING"
  | "TREND"
  | "HIGHLIGHT_TEXT"
  | "BOWTIE";

export interface DragDropClozePayload {
  textTemplate: string;
  draggableOptions: { id: string; label: string }[];
  blanks: { id: string; accepts: string[] }[];
}

export interface DragDropClozeResponse {
  placements: Record<string, string>;
}

export interface DragDropRationalePayload {
  baseSentenceTemplate: string;
  draggableCauses: { id: string; label: string }[];
  draggableEffects: { id: string; label: string }[];
  effectsCount: number;
}

export interface DragDropRationaleResponse {
  selectedCause: string;
  selectedEffects: string[];
}

export interface DropdownClozePayload {
  paragraphs: { id: string; textTemplate: string }[];
  dropdowns: {
    id: string;
    placeholderKey: string;
    options: { id: string; label: string }[];
  }[];
}

export interface DropdownClozeResponse {
  selections: Record<string, string>;
}

export interface DropdownRationalePayload {
  sentenceTemplate: string;
  causeOptions: { id: string; label: string }[];
  effectOptions: { id: string; label: string }[];
  effectsCount: number;
}

export interface DropdownRationaleResponse {
  selectedCause: string;
  selectedEffects: string[];
}

export interface DropdownTablePayload {
  columns: { id: string; label: string }[];
  rows: {
    id: string;
    label: string;
    cells: {
      columnId: string;
      dropdownOptions: { id: string; label: string }[];
    }[];
  }[];
}

export interface DropdownTableResponse {
  cellSelections: Record<string, Record<string, string>>;
}

export interface MatrixSinglePayload {
  columns: { id: string; label: string }[];
  rows: { id: string; label: string }[];
  requireAllRowsAnswered: boolean;
}

export interface MatrixSingleResponse {
  selections: Record<string, string>;
}

export interface MatrixMultiPayload {
  columns: { id: string; label: string }[];
  rows: { id: string; label: string }[];
  selectionRule: {
    perRowMin: number;
    perRowMax: number;
    perColumnMin: number;
  };
}

export interface MatrixMultiResponse {
  selections: Record<string, string[]>;
}

export interface MultiResponseGroupingPayload {
  groups: {
    id: string;
    label: string;
    options: { id: string; label: string }[];
  }[];
  requireAtLeastOnePerGroup: boolean;
}

export interface MultiResponseGroupingResponse {
  groupSelections: Record<string, string[]>;
}

export interface TrendPayload {
  timepoints: {
    tId: string;
    label: string;
    nurseNotes?: string;
    vitals?: Record<string, string>;
    labs?: Record<string, string>;
    meds?: string[];
  }[];
  embeddedItem: {
    questionType: NGNQuestionType;
    stem?: string;
    itemPayload: NGNItemPayload;
    correctResponse: NGNCorrectResponse;
    scoringRule: ScoringRule;
  };
}

export interface TrendResponse {
  embeddedResponse: NGNUserResponse;
}

export interface HighlightTextPayload {
  passage: string;
  highlightSpans: {
    spanId: string;
    start: number;
    end: number;
    label?: string;
  }[];
  maxSelections: number;
}

export interface HighlightTextResponse {
  selectedSpanIds: string[];
}

export interface BowtiePayload {
  conditionOptions: { id: string; label: string }[];
  actionOptions: { id: string; label: string }[];
  monitorOptions: { id: string; label: string }[];
  slots: {
    conditionCount: number;
    actionCount: number;
    monitorCount: number;
  };
}

export interface BowtieResponse {
  selectedConditions: string[];
  selectedActions: string[];
  selectedMonitors: string[];
}

export interface BowtieCorrectResponse {
  correctConditions: string[];
  correctActions: string[];
  correctMonitors: string[];
}

export type NGNItemPayload =
  | DragDropClozePayload
  | DragDropRationalePayload
  | DropdownClozePayload
  | DropdownRationalePayload
  | DropdownTablePayload
  | MatrixSinglePayload
  | MatrixMultiPayload
  | MultiResponseGroupingPayload
  | TrendPayload
  | HighlightTextPayload
  | BowtiePayload;

export type NGNUserResponse =
  | DragDropClozeResponse
  | DragDropRationaleResponse
  | DropdownClozeResponse
  | DropdownRationaleResponse
  | DropdownTableResponse
  | MatrixSingleResponse
  | MatrixMultiResponse
  | MultiResponseGroupingResponse
  | TrendResponse
  | HighlightTextResponse
  | BowtieResponse;

export type NGNCorrectResponse =
  | DragDropClozeResponse
  | DragDropRationaleResponse
  | DropdownClozeResponse
  | DropdownRationaleResponse
  | DropdownTableResponse
  | MatrixSingleResponse
  | MatrixMultiResponse
  | MultiResponseGroupingResponse
  | TrendResponse
  | HighlightTextResponse
  | BowtieCorrectResponse;

export interface ScoringRule {
  type: "allOrNothing" | "partialCredit" | "dichotomous" | "+/-";
  partialCredit: boolean;
  perItemPoints: number;
}

export interface NGNQuestion {
  id: string;
  stem: string;
  scenario?: string;
  questionType: NGNQuestionType;
  itemPayload: NGNItemPayload;
  correctResponse: NGNCorrectResponse;
  scoringRule: ScoringRule;
  rationale: string;
  references?: string[];
  difficulty: 1 | 2 | 3;
  blueprintTags: {
    domain: string;
    subdomain?: string;
    exam?: string;
    tier?: string;
  };
}
