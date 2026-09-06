import { zipSync, strToU8 } from 'fflate';
import type { Question, AppConfig, ExamMeta } from '../types';
import type { SetQuestion } from './shuffle';
import { buildMetaFileBase, buildMetaHeaderLine } from './meta';
import { getSetLabel } from './shuffle';

export function buildQuestionPaperHTML(
  setQuestions: SetQuestion[],
  setLetter: string,
  metaHeader: string
): string {
  const questionsHtml = setQuestions.map(q => `
    <div class="q">
      <div class="qline">${q.displayNumber}. ${q.text}</div>
      <div class="opts">
        ${q.options.map(opt => `<div>${opt.letter}. ${opt.text}</div>`).join('')}
      </div>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Question Paper — Set ${setLetter}</title>
<style>
  body { font-family: sans-serif; padding: 20px; color: #000; background: #fff; }
  .q { margin-bottom: 20px; page-break-inside: avoid; }
  .qline { font-weight: bold; margin-bottom: 8px; }
  .opts { margin-left: 20px; }
</style></head><body>
${metaHeader ? `<div style="margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 10px;">${metaHeader}</div>` : ''}
<h2>Question Paper — Set ${setLetter}</h2>
${questionsHtml}
</body></html>`;
}

export function buildAnswerKeyCSV(
  sets: SetQuestion[][],
  masterQuestions: Question[],
  config: AppConfig,
  metaHeader: string
): string {
  const header = "Key Letter,Question Number,Response/Mapping,Correct Marks,Incorrect Marks,Tags";
  const commentHeader = `# ${metaHeader.replace(/,/g, ';')}`;
  let csv = commentHeader + "\n" + header + "\n";

  const maxQuestions = Math.max(...sets.map(s => s.length), 0);
  for (let i = 0; i < maxQuestions; i++) {
    const displayNumber = i + 1;
    sets.forEach((set, setIdx) => {
      const q = set[i];
      const letter = getSetLabel(setIdx);
      const mapping = q ? `Q${q.origNumber} → ${q.answer || '—'}` : '—';
      csv += `${letter},${displayNumber},"${mapping}",${config.marksCorrect},${config.marksIncorrect},\n`;
    });
  }
  return csv;
}

export function buildExportZip(
  sets: SetQuestion[][],
  masterQuestions: Question[],
  config: AppConfig,
  meta: ExamMeta
): Uint8Array {
  const metaHeader = buildMetaHeaderLine(meta);
  const files: Record<string, Uint8Array> = {};

  sets.forEach((set, idx) => {
    const letter = getSetLabel(idx);
    const html = buildQuestionPaperHTML(set, letter, metaHeader);
    files[`QuestionPaper-Set${letter}.html`] = strToU8(html);
  });

  const csv = buildAnswerKeyCSV(sets, masterQuestions, config, metaHeader);
  files['AllAnswerKeys.csv'] = strToU8(csv);

  return zipSync(files);
}