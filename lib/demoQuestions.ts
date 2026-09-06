import type { Question } from '@/types';

// The 12 generic placeholder questions used by BOTH the calibration screen
// (Milestone 5) and the "Export AI reformatting prompt" worked examples
// (source: buildDemoQuestions(), mcq-projector_v8.html L1695-1711). Kept as
// a function (not a static array) so each call is a fresh, independent
// array — matches source exactly, and avoids any risk of a caller mutating
// a shared instance.
export function buildDemoQuestions(): Question[] {
  const demo: Question[] = [];
  for (let i = 1; i <= 12; i++) {
    demo.push({
      number: i,
      text: `Sample question ${i} — check that this text and the options below are readable from the back of the room.`,
      options: [
        { letter: 'A', text: 'Sample option A' },
        { letter: 'B', text: 'Sample option B' },
        { letter: 'C', text: 'Sample option C' },
        { letter: 'D', text: 'Sample option D' },
      ],
      answer: 'A',
    });
  }
  return demo;
}

// The exact 4-question worked example loaded by "Load a sample" (source
// L1502-1529). Kept verbatim, including the mixed "A)"/"Answer:" style.
export const SAMPLE_QUESTION_TEXT = `What is the chemical symbol for water?
A) H2O
B) O2
C) CO2
D) NaCl
Answer: A

Which planet is known as the Red Planet?
A) Venus
B) Mars
C) Jupiter
D) Saturn
Answer: B

Who wrote "Romeo and Juliet"?
A) Charles Dickens
B) Mark Twain
C) William Shakespeare
D) Leo Tolstoy
Answer: C

What is 7 x 8?
A) 54
B) 56
C) 58
D) 64
Answer: B`;