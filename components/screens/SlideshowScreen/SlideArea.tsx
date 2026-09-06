'use client';

import type { CSSProperties } from 'react';
import { useExamStore } from '@/store/examStore';
import { getSetLabel } from '@/lib/shuffle';
import styles from './SlideshowScreen.module.css';

// Source: renderSlide() (mcq-projector_v8.html L1807-1874) — the DOM-
// building half only; timer/progress-bar values live in Topbar.
export function SlideArea() {
  const sets = useExamStore((s) => s.sets);
  const config = useExamStore((s) => s.config);
  const slideIndex = useExamStore((s) => s.slideIndex);

  const start = slideIndex * config.perSlide;
  const end = Math.min(start + config.perSlide, sets[0]?.length ?? 0);

  // Source sets --qsize/--optsize on documentElement (L1727-1728); scoping
  // to this subtree is equivalent since .qText/.optRow only ever appear
  // inside it.
  const slideAreaStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${config.numSets}, 1fr)`,
    ['--qsize' as string]: `${config.qsize}px`,
    ['--optsize' as string]: `${config.optsize}px`,
  } as CSSProperties;

  return (
    <div className={styles.slideArea} style={slideAreaStyle}>
      {sets.map((setQuestions, sIdx) => (
        <div className={styles.setCol} key={sIdx}>
          {config.numSets > 1 && <div className={styles.setLabel}>Set {getSetLabel(sIdx)}</div>}
          {setQuestions.slice(start, end).map((q) => (
            <div className={styles.qBlock} key={q.displayNumber}>
              <div className={styles.qText}>
                <span className={styles.qNum}>{q.displayNumber}.</span>
                {q.text}
              </div>
              <div className={styles.optList}>
                {q.options.map((o) => (
                  <div className={styles.optRow} key={o.letter}>
                    <span className={styles.optLetter}>{o.letter})</span>
                    {o.text}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
