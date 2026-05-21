import test from "node:test";
import assert from "node:assert/strict";
import { buildLabsHref, parseExamTarget } from "./exam-target";

test("parseExamTarget accepts canonical enums", () => {
  assert.equal(parseExamTarget("REX_PN"), "REX_PN");
  assert.equal(parseExamTarget("np"), "NP");
});

test("parseExamTarget maps signup-style slugs", () => {
  assert.equal(parseExamTarget("nclex_rn"), "NCLEX_RN");
  assert.equal(parseExamTarget("rex-pn"), "REX_PN");
});

test("parseExamTarget defaults safely", () => {
  assert.equal(parseExamTarget(""), "NCLEX_RN");
  assert.equal(parseExamTarget(undefined), "NCLEX_RN");
});

test("buildLabsHref encodes params", () => {
  assert.equal(buildLabsHref("NP", "lft"), "/app/labs?examTarget=NP&focus=lft");
  assert.equal(buildLabsHref("NCLEX_RN"), "/app/labs?examTarget=NCLEX_RN");
});
