import { describe, it, expect } from "vitest";
import { parseQuestions } from "./parser";

describe("parseQuestions", () => {
  it("parses a well-formed block with an Answer: line", () => {
    const raw = `What is 2+2?
A) 3
B) 4
C) 5
Answer: B`;
    const { questions, skipped, invalidAnswers } = parseQuestions(raw);
    expect(skipped).toHaveLength(0);
    expect(invalidAnswers).toHaveLength(0);
    expect(questions).toHaveLength(1);
    expect(questions[0].text).toBe("What is 2+2?");
    expect(questions[0].options).toHaveLength(3);
    expect(questions[0].answer).toBe("B");
  });

  it("recognizes the *X shorthand answer form", () => {
    const raw = `Capital of France?
A) Berlin
B) Paris
*B`;
    const { questions } = parseQuestions(raw);
    expect(questions[0].answer).toBe("B");
  });

  it("joins multi-line question text with spaces", () => {
    const raw = `This is a question
that spans two lines.
A) One
B) Two`;
    const { questions } = parseQuestions(raw);
    expect(questions[0].text).toBe("This is a question that spans two lines.");
  });

  it("skips a block with fewer than 2 options and reports a 40-char preview", () => {
    const longText = "A".repeat(60);
    const raw = `${longText}\nA) Only one option`;
    const { questions, skipped } = parseQuestions(raw);
    expect(questions).toHaveLength(0);
    expect(skipped).toHaveLength(1);
    expect(skipped[0]).toContain(longText.slice(0, 40) + "…");
  });

  it("drops and reports an answer letter not among the parsed options", () => {
    const raw = `Question?
A) One
B) Two
Answer: Z`;
    const { questions, invalidAnswers } = parseQuestions(raw);
    expect(questions[0].answer).toBeNull();
    expect(invalidAnswers).toHaveLength(1);
    expect(invalidAnswers[0]).toContain("Q1");
  });

  it("accumulates multiple issues into skipped/invalidAnswers rather than throwing", () => {
    const raw = `Bad block only one option\nA) Solo\n\nGood question\nA) One\nB) Two\nAnswer: Q`;
    const { skipped, invalidAnswers } = parseQuestions(raw);
    expect(skipped).toHaveLength(1);
    expect(invalidAnswers).toHaveLength(1);
  });
});