import { buildDemoQuestions } from './demoQuestions';

// Ported verbatim from source buildAiPromptText() / buildAiPromptExamples()
// (mcq-projector_v8.html L1548-1606). Reuses the same 12 demo questions
// shown in calibration, so the AI's worked examples match what the teacher
// already previewed.
function buildAiPromptExamples(): string {
  return buildDemoQuestions()
    .map((q) => {
      const optLines = q.options.map((o) => `${o.letter}) ${o.text}`).join('\n');
      return `${q.text}\n${optLines}\nAnswer: ${q.answer}`;
    })
    .join('\n\n');
}

export function buildAiPromptText(): string {
  return `MCQ REFORMATTING REQUEST — for MCQ Projector (Exam Display)
================================================================

I already have a finished multiple-choice exam paper. Please reformat ONLY
its structure to match the exact plain-text format described below. Do NOT
change the wording of any question or option, do NOT add, remove, reorder,
merge, or split any question or option, do NOT solve or fact-check
anything, and do NOT add commentary, titles, numbering, explanations, or
markdown formatting. Output ONLY the reformatted questions in plain text,
ready to paste directly into a text box.

FORMAT RULES
------------
1. Each question is one block of consecutive lines. Separate every
   question block from the next with exactly one fully blank line. Do not
   leave a blank line inside a question block.
2. The question text comes first and may span more than one line; keep
   those lines together with no blank line between them — they will be
   joined into a single question.
3. Strip any pre-existing question numbering from the start of the
   question text ("1.", "Q1)", "Question 3:", etc.) — the app assigns its
   own running numbers automatically.
4. Each answer option is its own line: a single letter, then ")" or ".",
   then a space, then the option text — for example:
     A) Paris
     B. Madrid
   Use letters A, B, C, D, E, F, G, H in order, one per option, never
   skipping or repeating a letter within the same question.
5. Every question needs at least 2 options (maximum 8).
6. If — and only if — the source exam marks a correct answer for a
   question, add exactly ONE line right after its last option, written as
   either:
     Answer: C
     *C
   That letter must exactly match one of that same question's own option
   letters. If the source has no marked answer for a question, omit this
   line entirely for that question — never guess one.
7. No quotes, bullets, backticks, asterisked emphasis, or markdown of any
   kind. Plain text only, exactly like the examples below.

WORKED EXAMPLES — 12 questions in the exact target format
-------------------------------------------------------------------
${buildAiPromptExamples()}
-------------------------------------------------------------------

Now reformat the exam pasted as the companion file (ask for upload the
teacher made question paper, if not yet loaded).
`;
}