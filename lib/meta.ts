import type { ExamMeta } from '../types';

// Ported verbatim from mcq-projector_v8.html: pad2, nowLocalForInput,
// formatDateForHeader, formatDateForFilename, buildMetaLabelParts,
// buildMetaHeaderLine, buildMetaFileBase.
//
// Source reads these off a global `state.meta` object; here they take an
// explicit ExamMeta parameter instead (same fields, typed state store -
// see plan §7/§8), so behavior is unchanged but the functions are pure.

export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

// Value string usable directly by an <input type="datetime-local">.
export function nowLocalForInput(d?: Date): string {
  const dt = d ?? new Date();
  return `${dt.getFullYear()}-${pad2(dt.getMonth() + 1)}-${pad2(dt.getDate())}T${pad2(dt.getHours())}:${pad2(dt.getMinutes())}`;
}

// Human-readable date for headers, e.g. "06 Sep 2026".
export function formatDateForHeader(localValue: string): string {
  if (!localValue) return '';
  const d = new Date(localValue);
  if (isNaN(d.getTime())) return '';
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${pad2(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

// Filesystem-safe date fragment, e.g. "2026-09-06".
export function formatDateForFilename(localValue: string): string {
  if (!localValue) return '';
  const d = new Date(localValue);
  if (isNaN(d.getTime())) return '';
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

// Only the fields the teacher actually filled in are used - blanks are
// simply omitted rather than shown as "N/A" anywhere this is printed.
// When the Subject came from the structured course list, the exam-paper
// convention "Code - Short Name" is used instead of the short name alone.
export function buildMetaLabelParts(meta: ExamMeta): string[] {
  const parts: string[] = [];
  if (meta.program) parts.push(meta.program);
  if (meta.semester) parts.push('Semester ' + meta.semester);
  if (meta.subject) {
    parts.push(meta.subjectCode ? `${meta.subjectCode} — ${meta.subject}` : meta.subject);
  }
  if (meta.examName === 'Class Quiz') {
    parts.push(meta.quizNumber ? `Class Quiz ${meta.quizNumber}` : 'Class Quiz');
  } else if (meta.examName) {
    parts.push(meta.examName);
  }
  return parts;
}

export function buildMetaHeaderLine(meta: ExamMeta): string {
  const parts = buildMetaLabelParts(meta);
  const dateStr = formatDateForHeader(meta.date);
  if (dateStr) parts.push(dateStr);
  return parts.join(' — ');
}

// Readable base name for exported files, e.g.
// "PharmD_Sem4_PHARM416_ClassQuiz3_2026-09-06". Uses just the Course Code
// (compact, filesystem-safe, uniquely identifies the course) when the
// Subject came from the structured list; falls back to the free-typed
// subject text otherwise. Falls back to a generic timestamped name when
// every field was left blank.
export function buildMetaFileBase(meta: ExamMeta): string {
  const parts: string[] = [];
  if (meta.program) parts.push(meta.program.replace(/[^A-Za-z0-9]+/g, ''));
  if (meta.semester) parts.push('Sem' + meta.semester);
  if (meta.subjectCode) {
    parts.push(meta.subjectCode.replace(/[^A-Za-z0-9]+/g, ''));
  } else if (meta.subject) {
    parts.push(meta.subject.replace(/\s+/g, ''));
  }
  if (meta.examName === 'Class Quiz') {
    parts.push('ClassQuiz' + (meta.quizNumber || ''));
  } else if (meta.examName) {
    parts.push(meta.examName.replace(/\s+/g, ''));
  }
  const dateFrag = formatDateForFilename(meta.date);
  if (dateFrag) parts.push(dateFrag);

  if (!parts.length) return 'mcq-exam-' + formatDateForFilename(nowLocalForInput());
  return parts.join('_');
}