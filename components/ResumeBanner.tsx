'use client';

// Resume-session banner — source: #resumeBanner, checkAutosave()
// (mcq-projector_v8.html L427-433, L1228-1256). Milestone 7: `resumeData`
// is populated by persistence.ts's checkAutosave() on app mount; this
// component just renders it and wires Resume/Discard to the store.
import { useExamStore } from '@/store/examStore';
import { isRecoverableExam } from '@/store/persistence';

export function ResumeBanner() {
  const resumeData = useExamStore((s) => s.resumeData);
  const restoreAutosave = useExamStore((s) => s.restoreAutosave);
  const discardAutosave = useExamStore((s) => s.discardAutosave);

  if (!resumeData) return null;

  const hasExam = isRecoverableExam(resumeData.exam);
  const savedAtText = new Date(resumeData.savedAt).toLocaleString();

  return (
    <div
      role="alert"
      style={{
        background: 'rgba(242,201,76,0.14)',
        border: '1px solid rgba(242,201,76,0.4)',
        borderRadius: 8,
        padding: '12px 16px',
        marginBottom: 16,
      }}
    >
      <p style={{ margin: '0 0 8px' }}>
        {hasExam
          ? `A previous exam in progress was found (saved ${savedAtText}).`
          : `A previous pasted question bank was found (saved ${savedAtText}).`}
      </p>
      <button type="button" onClick={restoreAutosave} style={{ marginRight: 8 }}>
        {hasExam ? 'Resume exam' : 'Restore questions'}
      </button>
      <button type="button" onClick={discardAutosave}>
        Discard &amp; start fresh
      </button>
    </div>
  );
}