// Ported verbatim from mcq-projector_v8.html: shuffle(), buildSet(),
// getSetLabel(), and the PERSLIDE_BY_SETS lookup table (§2.4 of the plan).

import type { ParsedQuestion } from "./parser";

export function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
export const SET_LETTERS = LETTERS;

export function getSetLabel(sIdx: number): string {
  return SET_LETTERS[sIdx] ?? String(sIdx + 1);
}

// Default questions-per-screen for a given number of scrambled sets (1-8).
// More side-by-side sets need a narrower per-screen count; the teacher can
// still override manually (Setup screen re-applies this only if untouched).
export const PERSLIDE_BY_SETS: Record<number, number> = {
  1: 6, 2: 5, 3: 4, 4: 3, 5: 3, 6: 2, 7: 2, 8: 2,
};

export interface SetOption {
  letter: string;
  text: string;
  origLetter: string;
}

export interface SetQuestion {
  displayNumber: number;
  origNumber: number;
  text: string;
  options: SetOption[];
  answer: string | null;
}

export function buildSet(questions: ParsedQuestion[]): SetQuestion[] {
  // Shuffle the ORDER of questions for this set...
  const orderShuffled = shuffle(questions);
  // ...and independently shuffle the OPTIONS within each question.
  return orderShuffled.map((q, idx) => {
    const shuffledOpts = shuffle(q.options);
    const newOptions: SetOption[] = shuffledOpts.map((o, i) => ({
      letter: LETTERS[i],
      text: o.text,
      origLetter: o.letter,
    }));

    let newAnswer: string | null = null;
    if (q.answer) {
      const found = newOptions.find((o) => o.origLetter === q.answer);
      newAnswer = found ? found.letter : null;
    }

    // displayNumber: the sequential 1,2,3... the student sees and writes on
    // their answer sheet - always in order, same across every set.
    // origNumber: which bank question actually sits here, kept only for the
    // teacher's answer key, never shown to students.
    return {
      displayNumber: idx + 1,
      origNumber: q.number,
      text: q.text,
      options: newOptions,
      answer: newAnswer,
    };
  });
}