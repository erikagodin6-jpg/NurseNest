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
