import type {
  NGNQuestionType,
  NGNItemPayload,
  NGNUserResponse,
  CaseStudySeriesPayload,
  CaseStudySeriesResponse,
  LabInterpretationPayload,
  LabInterpretationResponse,
  ImageHotspotPayload,
  ImageHotspotResponse,
  CalculationNumericPayload,
  CalculationNumericResponse,
  MatchingGridPayload,
  MatchingGridResponse,
  DragDropClozeResponse,
  DragDropRationaleResponse,
  DropdownClozeResponse,
  DropdownRationaleResponse,
  DropdownTableResponse,
  MatrixSingleResponse,
  MatrixMultiResponse,
  MultiResponseGroupingResponse,
  TrendResponse,
  HighlightTextResponse,
  BowtieResponse,
} from "@/lib/ngn-question-types";
import { CaseStudySeriesRenderer } from "./case-study-series-renderer";
import { LabInterpretationRenderer } from "./lab-interpretation-renderer";
import { ImageHotspotRenderer } from "./image-hotspot-renderer";
import { CalculationNumericRenderer } from "./calculation-numeric-renderer";
import { MatchingGridRenderer } from "./matching-grid-renderer";

interface NGNQuestionDispatcherProps {
  questionType: NGNQuestionType;
  payload: NGNItemPayload;
  response: NGNUserResponse;
  onResponseChange: (response: NGNUserResponse) => void;
  disabled?: boolean;
}

export function createDefaultResponse(questionType: NGNQuestionType): NGNUserResponse {
  switch (questionType) {
    case "DRAG_DROP_CLOZE":
      return { placements: {} } as DragDropClozeResponse;
    case "DRAG_DROP_RATIONALE":
      return { selectedCause: "", selectedEffects: [] } as DragDropRationaleResponse;
    case "DROPDOWN_CLOZE":
      return { selections: {} } as DropdownClozeResponse;
    case "DROPDOWN_RATIONALE":
      return { selectedCause: "", selectedEffects: [] } as DropdownRationaleResponse;
    case "DROPDOWN_TABLE":
      return { cellSelections: {} } as DropdownTableResponse;
    case "MATRIX_SINGLE":
      return { selections: {} } as MatrixSingleResponse;
    case "MATRIX_MULTI":
      return { selections: {} } as MatrixMultiResponse;
    case "MULTI_RESPONSE_GROUPING":
      return { groupSelections: {} } as MultiResponseGroupingResponse;
    case "TREND":
      return { embeddedResponse: {} as NGNUserResponse } as TrendResponse;
    case "HIGHLIGHT_TEXT":
      return { selectedSpanIds: [] } as HighlightTextResponse;
    case "BOWTIE":
      return { selectedConditions: [], selectedActions: [], selectedMonitors: [] } as BowtieResponse;
    case "CASE_STUDY_SERIES":
      return { subResponses: {} } as CaseStudySeriesResponse;
    case "LAB_INTERPRETATION":
      return { selectedOptionIds: [] } as LabInterpretationResponse;
    case "IMAGE_HOTSPOT":
      return { selectedRegionIds: [] } as ImageHotspotResponse;
    case "CALCULATION_NUMERIC":
      return { numericAnswer: null, selectedUnit: "" } as CalculationNumericResponse;
    case "MATCHING_GRID":
      return { matches: {} } as MatchingGridResponse;
    default:
      return { placements: {} } as DragDropClozeResponse;
  }
}

export function NGNQuestionDispatcher({
  questionType,
  payload,
  response,
  onResponseChange,
  disabled = false,
}: NGNQuestionDispatcherProps) {
  switch (questionType) {
    case "CASE_STUDY_SERIES":
      return (
        <CaseStudySeriesRenderer
          payload={payload as CaseStudySeriesPayload}
          response={response as CaseStudySeriesResponse}
          onResponseChange={onResponseChange}
          disabled={disabled}
        />
      );
    case "LAB_INTERPRETATION":
      return (
        <LabInterpretationRenderer
          payload={payload as LabInterpretationPayload}
          response={response as LabInterpretationResponse}
          onResponseChange={onResponseChange}
          disabled={disabled}
        />
      );
    case "IMAGE_HOTSPOT":
      return (
        <ImageHotspotRenderer
          payload={payload as ImageHotspotPayload}
          response={response as ImageHotspotResponse}
          onResponseChange={onResponseChange}
          disabled={disabled}
        />
      );
    case "CALCULATION_NUMERIC":
      return (
        <CalculationNumericRenderer
          payload={payload as CalculationNumericPayload}
          response={response as CalculationNumericResponse}
          onResponseChange={onResponseChange}
          disabled={disabled}
        />
      );
    case "MATCHING_GRID":
      return (
        <MatchingGridRenderer
          payload={payload as MatchingGridPayload}
          response={response as MatchingGridResponse}
          onResponseChange={onResponseChange}
          disabled={disabled}
        />
      );
    default:
      return (
        <div
          className="p-4 border border-amber-200 bg-amber-50 rounded-lg text-sm text-amber-800"
          data-testid={`ngn-unsupported-${questionType}`}
        >
          <p className="font-medium">Question format: {questionType}</p>
          <p className="mt-1 text-amber-600">
            This question format does not yet have an interactive renderer.
          </p>
        </div>
      );
  }
}
