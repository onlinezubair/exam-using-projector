import { describe, it, expect } from "vitest";
import { buildMetaHeaderLine, buildMetaFileBase } from "./meta";
import type { ExamMeta } from "../types";

function emptyMeta(): ExamMeta {
  return {
    program: "",
    semester: '',
    subject: "",
    subjectCode: "",
    subjectFullName: "",
    subjectMode: 'browse',
    examName: "",
    quizNumber: '',
    date: "",
    dateManuallySet: false,
  };
}

describe("buildMetaHeaderLine", () => {
  it("returns an empty string when every field is blank", () => {
    expect(buildMetaHeaderLine(emptyMeta())).toBe("");
  });

  it("omits blank fields and joins the rest with em-dashes", () => {
    const meta = { ...emptyMeta(), program: "Pharm.D", semester: 4 };
    expect(buildMetaHeaderLine(meta)).toBe("Pharm.D — Semester 4");
  });

  it("uses 'Code — Short Name' when subjectCode is present", () => {
    const meta = { ...emptyMeta(), subject: "Applied Pharmaceutical Microbiology & Immunology", subjectCode: "PHARM416" };
    expect(buildMetaHeaderLine(meta)).toBe("PHARM416 — Applied Pharmaceutical Microbiology & Immunology");
  });

  it("renders 'Class Quiz N' only for the Class Quiz exam type", () => {
    const meta = { ...emptyMeta(), examName: "Class Quiz", quizNumber: 3 };
    expect(buildMetaHeaderLine(meta)).toBe("Class Quiz 3");
  });

  it("appends the human-readable date last", () => {
    const meta = { ...emptyMeta(), program: "Pharm.D", date: "2026-09-06T10:30" };
    expect(buildMetaHeaderLine(meta)).toBe("Pharm.D — 06 Sep 2026");
  });
});

describe("buildMetaFileBase", () => {
  it("builds the documented pattern from a fully-populated meta", () => {
    const meta: ExamMeta = {
      program: "Pharm.D",
      semester: 4,
      subject: "Applied Pharmaceutical Microbiology & Immunology",
      subjectCode: "PHARM416",
      subjectFullName: "Applied Pharmaceutical Microbiology & Immunology",
      subjectMode: 'browse',
      examName: "Class Quiz",
      quizNumber: 3,
      date: "2026-09-06T10:30",
      dateManuallySet: false,
    };
    expect(buildMetaFileBase(meta)).toBe("PharmD_Sem4_PHARM416_ClassQuiz3_2026-09-06");
  });

  it("falls back to the free-typed subject when there is no subjectCode", () => {
    const meta = { ...emptyMeta(), subject: "Botany Basics" };
    expect(buildMetaFileBase(meta)).toBe("BotanyBasics");
  });

  it("falls back to a generic timestamped name when every field is blank", () => {
    const base = buildMetaFileBase(emptyMeta());
    expect(base).toMatch(/^mcq-exam-\d{4}-\d{2}-\d{2}$/);
  });
});