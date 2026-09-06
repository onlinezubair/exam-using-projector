// Ported verbatim from mcq-projector_v8.html: parseQuestions()
// Blocks are separated by a blank line. Within a block, question text lines
// may span multiple lines (joined with spaces); option lines match
// ^([A-Za-z])[).]\s*(.+)$ ; one optional answer line as "Answer: X" or "*X".

export interface ParsedOption {
  letter: string;
  text: string;
}

export interface ParsedQuestion {
  number: number;
  text: string;
  options: ParsedOption[];
  answer: string | null;
}

export interface ParseResult {
  questions: ParsedQuestion[];
  skipped: string[];
  invalidAnswers: string[];
}

export function parseQuestions(raw: string): ParseResult {
  const blocks = raw
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  const out: ParsedQuestion[] = [];
  const skipped: string[] = [];
  const invalidAnswers: string[] = [];

  blocks.forEach((block, idx) => {
    const lines = block
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    const qLines: string[] = [];
    const options: ParsedOption[] = [];
    let answer: string | null = null;

    lines.forEach((line) => {
      const ansMatch = line.match(/^answer\s*[:=]\s*([A-Za-z])/i);
      const starMatch = line.match(/^\*\s*([A-Za-z])\s*$/);
      const optMatch = line.match(/^([A-Za-z])[).]\s*(.+)$/);

      if (ansMatch) {
        answer = ansMatch[1].toUpperCase();
      } else if (starMatch) {
        answer = starMatch[1].toUpperCase();
      } else if (optMatch) {
        options.push({ letter: optMatch[1].toUpperCase(), text: optMatch[2].trim() });
      } else {
        qLines.push(line);
      }
    });

    if (options.length >= 2) {
      if (answer && !options.some((o) => o.letter === answer)) {
        invalidAnswers.push(`Q${idx + 1} (marked "${answer}", not among its options)`);
        answer = null;
      }
      out.push({ number: idx + 1, text: qLines.join(' '), options, answer });
    } else {
      const preview = (qLines.join(' ') || block).slice(0, 40);
      skipped.push(`Block ${idx + 1}: "${preview}${preview.length === 40 ? '…' : ''}"`);
    }
  });

  return { questions: out, skipped, invalidAnswers };
}