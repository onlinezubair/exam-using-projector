// Ported verbatim from mcq-projector_v8.html fmtTime() (L616-621).
// Pure formatter: seconds -> "MM:SS", clamped at 0 and rounded.
export function fmtTime(sec: number): string {
  const clamped = Math.max(0, Math.round(sec));
  const m = Math.floor(clamped / 60);
  const s = clamped % 60;
  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}