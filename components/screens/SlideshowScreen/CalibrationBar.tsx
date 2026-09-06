'use client';

import { useExamStore } from '@/store/examStore';
import styles from './SlideshowScreen.module.css';

// Source: #calibBar (mcq-projector_v8.html L520-523, L169-179) and
// startExamBtn's click handler (L1760, -> beginRealExam(), L1732-1759).
export function CalibrationBar() {
  const calibrating = useExamStore((s) => s.calibrating);
  const beginRealExam = useExamStore((s) => s.beginRealExam);

  if (!calibrating) return null;

  return (
    <div className={styles.calibBar}>
      <span>
        🔧 <b>Calibration mode</b> — these are sample questions. Adjust font size (A-/A+) and questions per
        screen (Q-/Q+) below until it&apos;s fully readable, then start the real exam. No timer is running yet.
      </span>
      <button className={styles.primaryBtn} onClick={beginRealExam}>
        Start Exam →
      </button>
    </div>
  );
}