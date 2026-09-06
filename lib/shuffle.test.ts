import { describe, it, expect } from "vitest";
import { shuffle, buildSet, getSetLabel, PERSLIDE_BY_SETS } from "./shuffle";
import type { ParsedQuestion } from "./parser";

function sampleQuestions(): ParsedQuestion[] {
  return [
    { number: 1, text: "Q1", options: [{ letter: "A", text: "1-A" }, { letter: "B", text: "1-B" }], answer: "A" },
    { number: 2, text: "Q2", options: [{ letter: "A", text: "2-A" }, { letter: "B", text: "2-B" }, { letter: "C", text: "2-C" }], answer: "C" },
    { number: 3, text: "Q3", options: [{ letter: "A", text: "3-A" }, { letter: "B", text: "3-B" }], answer: null },
  ];
}

describe("shuffle", () => {
  it("returns a permutation of the input without mutating it", () => {
    const input = [1, 2, 3, 4, 5];
    const copy = [...input];
    const out = shuffle(input);
    expect(input).toEqual(copy); // original untouched
    expect(out.slice().sort()).toEqual(copy.sort());
  });
});

describe("getSetLabel", () => {
  it("uses A-H for the first 8 sets", () => {
    expect(getSetLabel(0)).toBe("A");
    expect(getSetLabel(7)).toBe("H");
  });
  it("falls back to a 1-based number beyond H", () => {
    expect(getSetLabel(8)).toBe("9");
  });
});

describe("PERSLIDE_BY_SETS", () => {
  it("matches the source lookup table for numSets 1-8", () => {
    expect(PERSLIDE_BY_SETS).toEqual({ 1: 6, 2: 5, 3: 4, 4: 3, 5: 3, 6: 2, 7: 2, 8: 2 });
  });
});

describe("buildSet", () => {
  it("renumbers displayNumber sequentially 1..N regardless of shuffle order", () => {
    for (let trial = 0; trial < 20; trial++) {
      const set = buildSet(sampleQuestions());
      expect(set.map((q) => q.displayNumber)).toEqual([1, 2, 3]);
      expect(set.map((q) => q.origNumber).slice().sort()).toEqual([1, 2, 3]);
    }
  });

  it("remaps the answer letter by position, not by option text", () => {
    for (let trial = 0; trial < 50; trial++) {
      const set = buildSet(sampleQuestions());
      set.forEach((q) => {
        const original = sampleQuestions().find((oq) => oq.number === q.origNumber)!;
        if (original.answer === null) {
          expect(q.answer).toBeNull();
          return;
        }
        // The option carrying the ORIGINAL answer letter must be the one
        // whose new letter is reported as the answer, and its text must be
        // unchanged from the original option text at that letter.
        const originalCorrectOpt = original.options.find((o) => o.letter === original.answer)!;
        const newCorrectOpt = q.options.find((o) => o.origLetter === original.answer)!;
        expect(newCorrectOpt.text).toBe(originalCorrectOpt.text);
        expect(q.answer).toBe(newCorrectOpt.letter);
      });
    }
  });

  it("preserves option text/origLetter through the shuffle (no data loss)", () => {
    const set = buildSet(sampleQuestions());
    set.forEach((q) => {
      const original = sampleQuestions().find((oq) => oq.number === q.origNumber)!;
      expect(q.options).toHaveLength(original.options.length);
      const origLetters = q.options.map((o) => o.origLetter).sort();
      expect(origLetters).toEqual(original.options.map((o) => o.letter).sort());
    });
  });
});