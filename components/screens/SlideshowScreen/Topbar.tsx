'use client';

import { useExamStore } from '@/store/examStore';
import { fmtTime } from '@/lib/time';
import styles from './SlideshowScreen.module.css';

// Source: #topbar (mcq-projector_v8.html L510-519), the calibrating branch
// of renderSlide() (L1855-1861), updateTimerDisplay() (L1876-1886), and
// updateOverallDisplay() (L1267-1271). Milestone 6a wires the real-exam
// values; Milestone 6b will layer keyboard shortcuts on top (no topbar
// changes expected there).
export function Topbar() {
  const calibrating = useExamStore((s) => s.calibrating);
  const slideIndex = useExamStore((s) => s.slideIndex);
  const slideCount = useExamStore((s) => s.slideCount);
  const timeLeft = useExamStore((s) => s.timeLeft);
  const slideDuration = useExamStore((s) => s.slideDuration);
  const totalElapsed = useExamStore((s) => s.totalElapsed);
  const totalDuration = useExamStore((s) => s.totalDuration);

  const slideMeta = calibrating
    ? `Calibration — screen ${slideIndex + 1} of ${slideCount}`
    : `Screen ${slideIndex + 1} of ${slideCount}`;

  const overallMeta = calibrating
    ? 'Not started — timer is not running yet.'
    : `Total: ${fmtTime(totalElapsed)} / ${fmtTime(totalDuration)}`;

  const timerDigits = calibrating ? 'DEMO' : fmtTime(timeLeft);

  // Source: updateTimerDisplay() (L1880-1885) — pct/color for the real
  // exam; calibration always shows a full accent-colored bar.
  let progressPct = 100;
  let progressColor = 'var(--accent)';
  if (!calibrating) {
    progressPct = slideDuration > 0 ? Math.max(0, (timeLeft / slideDuration) * 100) : 0;
    progressColor = 'var(--ok)';
    if (progressPct <= 20) progressColor = 'var(--danger)';
    else if (progressPct <= 50) progressColor = 'var(--accent)';
  }

  return (
    <div className={styles.topbar}>
      <div>
        <div className={styles.meta}>{slideMeta}</div>
        <div className={styles.overallMeta}>{overallMeta}</div>
      </div>
      <div className={styles.progressOuter}>
        <div
          className={styles.progressInner}
          style={{
            width: `${progressPct}%`,
            background: progressColor,
          }}
        />
      </div>
      <div className={styles.timerWrap}>
        <div className={styles.timerDigits}>{timerDigits}</div>
      </div>
    </div>
  );
}