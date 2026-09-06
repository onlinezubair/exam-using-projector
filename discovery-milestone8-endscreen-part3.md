# Discovery dump Part 3 - Milestone 8 (End screen) - 2026-09-06 16:32:36

## Directory listing: hooks
```
hooks\useBeforeUnloadGuard.test.tsx
hooks\useBeforeUnloadGuard.ts
hooks\useFullscreen.test.tsx
hooks\useFullscreen.ts
hooks\useKeyboardShortcuts.test.tsx
hooks\useKeyboardShortcuts.ts
```

## File: hooks\useKeyboardShortcuts.ts
```ts
'use client';

import { useEffect } from 'react';
import { useExamStore } from '@/store/examStore';
import { useFullscreen } from './useFullscreen';

// Source: the global keydown listener (mcq-projector_v8.html L1991-2007),
// gated there by `if (!screens.show.classList.contains('active')) return;`.
// In the port, SlideshowScreen only renders while screen === 'show' (see
// ExamApp.tsx), so mounting this hook only inside SlideshowScreen achieves
// the same scoping without re-checking `screen` on every keystroke.
//
// Space unconditionally calls togglePause(), matching source's
// `$('pauseBtn').click()` -- the pause button's click handler has no
// calibrating guard in source, even though the button itself isn't
// rendered during calibration. Harmless: there's no timer running yet to
// pause.
//
// Confirmed against source directly (not just the plan doc): Escape has
// NO fullscreen-aware double-press behavior. It always calls
// endExamToSetup() directly, with no check of document.fullscreenElement
// first. This intentionally implements that simple version.
export function useKeyboardShortcuts() {
  const goNextSlide = useExamStore((s) => s.goNextSlide);
  const goPrevSlide = useExamStore((s) => s.goPrevSlide);
  const adjustFont = useExamStore((s) => s.adjustFont);
  const adjustPerSlide = useExamStore((s) => s.adjustPerSlide);
  const togglePause = useExamStore((s) => s.togglePause);
  const endExamToSetup = useExamStore((s) => s.endExamToSetup);
  const { toggleFullscreen } = useFullscreen();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.code === 'Space') {
        e.preventDefault();
        togglePause();
      }
      if (e.code === 'ArrowRight') {
        goNextSlide();
      }
      if (e.code === 'ArrowLeft') {
        goPrevSlide();
      }
      // Zoom in/out -- adjust once at the start of projection and it holds
      // for the whole exam.
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        adjustFont(2);
      }
      if (e.key === '-') {
        e.preventDefault();
        adjustFont(-2);
      }
      // Questions per screen, live, clamped 2-5.
      if (e.key === ']') {
        e.preventDefault();
        adjustPerSlide(1);
      }
      if (e.key === '[') {
        e.preventDefault();
        adjustPerSlide(-1);
      }
      // Emergency / high-value shortcuts.
      if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      }
      // 'P' (print backup) is intentionally NOT wired yet: printBackup()
      // and PrintArea don't exist until Milestone 8. Wiring the key now
      // would just be a silent no-op.
      if (e.key === 'Escape') {
        e.preventDefault();
        endExamToSetup();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goNextSlide, goPrevSlide, adjustFont, adjustPerSlide, togglePause, endExamToSetup, toggleFullscreen]);
}
```

## File: hooks\useFullscreen.ts
```ts
'use client';

import { useCallback } from 'react';

// Source: toggleFullscreen() (mcq-projector_v8.html L1961-1968). Requests
// fullscreen on <html> (document.documentElement) if not already
// fullscreen, otherwise exits it. Guards both calls with `&&` exactly like
// source, for browsers/environments where the Fullscreen API is absent.
export function useFullscreen() {
  const toggleFullscreen = useCallback(() => {
    const el = document.documentElement;
    if (!document.fullscreenElement) {
      el.requestFullscreen && el.requestFullscreen();
    } else {
      document.exitFullscreen && document.exitFullscreen();
    }
  }, []);

  return { toggleFullscreen };
}
```

## File: hooks\useBeforeUnloadGuard.ts
```ts
'use client';

import { useEffect } from 'react';
import { useExamStore } from '@/store/examStore';
import { saveAutosave } from '@/store/persistence';

// Source: window 'beforeunload' listener (mcq-projector_v8.html
// L1983-1989). Source only arms the guard while
// currentScreenName() === 'show'; here that's achieved by mounting this
// hook only inside SlideshowScreen, which itself only renders while
// screen === 'show' (see ExamApp.tsx). Milestone 7: fires an immediate
// autosave right before the page actually unloads (HANDOFF Section 11),
// with a defensive `screen === 'show'` re-check matching source's literal
// guard condition even though this hook's mount point already implies it.
export function useBeforeUnloadGuard() {
  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (useExamStore.getState().screen === 'show') {
        saveAutosave();
      }
      e.preventDefault();
      e.returnValue = '';
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);
}
```

## File: components\screens\SlideshowScreen\SlideshowScreen.tsx
```tsx
'use client';

import { useEffect } from 'react';
import { useExamStore } from '@/store/examStore';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useBeforeUnloadGuard } from '@/hooks/useBeforeUnloadGuard';
import { Topbar } from './Topbar';
import { CalibrationBar } from './CalibrationBar';
import { SlideArea } from './SlideArea';
import { Bottombar } from './Bottombar';
import styles from './SlideshowScreen.module.css';

// Source: #show (mcq-projector_v8.html L508-541). Milestone 6a added the
// real-exam timer (auto-advance, progress bar, pause). Milestone 6b adds
// keyboard shortcuts (useKeyboardShortcuts) and the beforeunload guard
// (useBeforeUnloadGuard) -- both scoped to "only while Slideshow is
// visible" simply by being mounted here, since this component itself only
// renders while screen === 'show' (see ExamApp.tsx). That matches source's
// classList.contains('active') / currentScreenName() === 'show' guards
// without re-checking `screen` on every keystroke or unload event.
export function SlideshowScreen() {
  const slideCount = useExamStore((s) => s.slideCount);
  const startCalibration = useExamStore((s) => s.startCalibration);
  const stopTimer = useExamStore((s) => s.stopTimer);

  // Self-initializing: whichever screen navigates here (currently
  // SetupScreen's "Build slideshow ->"), calibration starts automatically
  // the first time this mounts with nothing built yet. Avoids having to
  // touch SetupScreen.tsx's handleBuild() for this milestone.
  useEffect(() => {
    if (slideCount === 0) {
      startCalibration();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Safety net: if this screen unmounts while a real-exam timer is still
  // running, make sure the interval doesn't keep ticking against an
  // unmounted screen. goNextSlide()'s own end-of-exam branch already calls
  // stopTimer() directly, and the new endExamToSetup() path also calls
  // stopTimer() itself, so this remains a pure safety net rather than the
  // primary stop path.
  useEffect(() => {
    return () => {
      stopTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useKeyboardShortcuts();
  useBeforeUnloadGuard();

  return (
    <div className={styles.screen}>
      <Topbar />
      <CalibrationBar />
      <SlideArea />
      <Bottombar />
    </div>
  );
}
```

## File: components\screens\SlideshowScreen\SlideshowScreen.module.css
```css
.screen {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 28px;
  border-bottom: 1px solid var(--rule);
  flex-shrink: 0;
}
.meta { font-size: 18px; color: var(--chalk-dim); }
.overallMeta { font-size: 13px; color: var(--chalk-dim); margin-top: 2px; }

.calibBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: var(--accent);
  color: #21301f;
  padding: 12px 28px;
  font-size: 15px;
  flex-shrink: 0;
}
.primaryBtn {
  background: #21301f;
  color: var(--accent);
  border: none;
  border-radius: 8px;
  padding: 14px 26px;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  flex-shrink: 0;
  white-space: nowrap;
}
.primaryBtn:hover { background: #16241d; }

.progressOuter {
  height: 10px;
  background: var(--board-dark);
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
  margin: 0 28px;
  flex: 1;
}
.progressInner {
  height: 100%;
  width: 100%;
  background: var(--ok);
  transition: width 0.3s linear, background 0.3s linear;
}

.timerWrap { display: flex; align-items: center; gap: 16px; }
.timerDigits {
  font-size: 34px;
  font-weight: 700;
  min-width: 100px;
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.slideArea {
  flex: 1;
  display: grid;
  gap: 0;
  padding: 26px 34px;
  overflow: auto;
}
.setCol {
  border-right: 1px dashed var(--rule);
  padding: 0 28px;
}
.setCol:last-child { border-right: none; }
.setLabel {
  font-size: 16px;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 14px;
  padding-bottom: 6px;
  border-bottom: 2px solid var(--accent-dim);
  display: inline-block;
}
.qBlock { margin-bottom: 26px; }
.qBlock:last-child { margin-bottom: 0; }
.qText {
  font-size: var(--qsize);
  font-weight: 700;
  margin-bottom: 10px;
  line-height: 1.35;
}
.qNum { color: var(--accent); margin-right: 8px; }
.optList { display: flex; flex-direction: column; gap: 6px; }
.optRow {
  font-size: var(--optsize);
  display: flex;
  gap: 10px;
  line-height: 1.3;
}
.optLetter { color: var(--chalk-dim); font-weight: 700; min-width: 26px; }

.bottombar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 14px;
  border-top: 1px solid var(--rule);
  flex-shrink: 0;
  opacity: 0.55;
  transition: opacity 0.2s;
  flex-wrap: wrap;
}
.bottombar:hover { opacity: 1; }
.bottombar button {
  background: var(--board-dark);
  color: var(--chalk);
  border: 1px solid var(--rule);
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
}
.bottombar button:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); }
.bottombar button:disabled { opacity: 0.4; cursor: not-allowed; }
.bottombar .hint { font-size: 12px; color: var(--chalk-dim); margin-left: 10px; }
.perSlideWrap { display: flex; align-items: center; gap: 6px; }
.perSlideDisplay { font-size: 13px; color: var(--chalk-dim); min-width: 62px; text-align: center; }

```

## File: components\screens\SlideshowScreen\Topbar.tsx
```tsx
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
```

## File: components\screens\SlideshowScreen\Bottombar.tsx
```tsx
'use client';

import { useExamStore } from '@/store/examStore';
import styles from './SlideshowScreen.module.css';

// Source: #bottombar (mcq-projector_v8.html L525-540). Milestone 6a wires
// Pause (source: pauseBtn click handler, L1956-1960 — hidden during
// calibration exactly like source, $('pauseBtn').style.display='none',
// L1725). Fullscreen/Print/Back-to-setup/keyboard shortcuts remain
// intentionally disabled stubs — Milestone 6b owns the useFullscreen hook,
// print/export, and useKeyboardShortcuts.
export function Bottombar() {
  const calibrating = useExamStore((s) => s.calibrating);
  const paused = useExamStore((s) => s.paused);
  const config = useExamStore((s) => s.config);
  const goNextSlide = useExamStore((s) => s.goNextSlide);
  const goPrevSlide = useExamStore((s) => s.goPrevSlide);
  const adjustFont = useExamStore((s) => s.adjustFont);
  const adjustPerSlide = useExamStore((s) => s.adjustPerSlide);
  const togglePause = useExamStore((s) => s.togglePause);

  return (
    <div className={styles.bottombar}>
      <button title="Previous screen  (←)" onClick={goPrevSlide}>⟵ Prev</button>
      {!calibrating && (
        <button title="Pause / Resume  (Space) — Space shortcut lands in Milestone 6b" onClick={togglePause}>
          {paused ? 'Resume' : 'Pause'}
        </button>
      )}
      <button title="Next screen  (→)" onClick={goNextSlide}>Next ⟶</button>
      <button title="Toggle full screen  (F) — Milestone 6b" disabled>Full screen</button>
      <button title="Zoom out  (-)" onClick={() => adjustFont(-2)}>A-</button>
      <button title="Zoom in  (+ or =)" onClick={() => adjustFont(2)}>A+</button>
      <span className={styles.perSlideWrap}>
        <button title="Fewer questions per screen, min 2  ([)" onClick={() => adjustPerSlide(-1)}>Q−</button>
        <span className={styles.perSlideDisplay} title="Questions currently shown per screen">
          {config.perSlide}/screen
        </span>
        <button title="More questions per screen, max 5  (])" onClick={() => adjustPerSlide(1)}>Q+</button>
      </span>
      <button title="Emergency paper backup — Milestone 6b" disabled>Print backup</button>
      <button title="End exam and return to setup — Milestone 6b" disabled>Back to setup</button>
      <span className={styles.hint}>
        Space=pause · ←/→=navigate · +/-=zoom · [ ]=Qs/screen · F=fullscreen · P=print backup · Esc=end
      </span>
    </div>
  );
}
```

## File: components\screens\SlideshowScreen\CalibrationBar.tsx
```tsx
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
```

## File: components\screens\SlideshowScreen\SlideArea.tsx
```tsx
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

```

## File: components\screens\SetupScreen\SetupScreen.tsx
```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useExamStore } from '@/store/examStore';
import { parseQuestions } from '@/lib/parser';
import { PERSLIDE_BY_SETS } from '@/lib/shuffle';
import { SAMPLE_QUESTION_TEXT } from '@/lib/demoQuestions';
import { buildAiPromptText } from '@/lib/aiPrompt';
import { ResumeBanner } from '@/components/ResumeBanner';
import { commitLastSettings, saveAutosave, scheduleAutosave } from '@/store/persistence';
import type { AppConfig } from '@/types';
import styles from './SetupScreen.module.css';

// Room presets are only ever read at "Build slideshow ->" time (source
// L1780-1782), NOT applied live on <select> change — deliberately not a
// live qsize/optsize update.
const ROOM_PRESETS: Record<AppConfig['roomSize'], { qsize: number; optsize: number }> = {
  small: { qsize: 24, optsize: 19 },
  medium: { qsize: 30, optsize: 23 },
  large: { qsize: 40, optsize: 30 },
};

function downloadTextFile(filename: string, text: string) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Setup screen — source: #setup (mcq-projector_v8.html L423-506), wiring at
// L1465-1611 and L1762-1804. Behavior note: numSets ALWAYS overwrites
// perSlide via PERSLIDE_BY_SETS on change (source has no "already
// overridden by teacher" tracking, despite plan Section 2.4's description —
// ground truth is the source, per project convention).
export function SetupScreen() {
  const setScreen = useExamStore((s) => s.setScreen);
  const storedConfig = useExamStore((s) => s.config);
  const storedRawInput = useExamStore((s) => s.rawInput);
  const setConfigInStore = useExamStore((s) => s.setConfig);
  const setRawInputInStore = useExamStore((s) => s.setRawInput);
  const setPendingQuestionsInStore = useExamStore((s) => s.setPendingQuestions);

  const [rawInput, setRawInput] = useState(storedRawInput);
  const [roomSize, setRoomSize] = useState<AppConfig['roomSize']>(storedConfig.roomSize);
  const [perSlide, setPerSlide] = useState(storedConfig.perSlide);
  const [secsPerQ, setSecsPerQ] = useState(storedConfig.secsPerQ);
  const [numSets, setNumSets] = useState(storedConfig.numSets);
  const [marksCorrect, setMarksCorrect] = useState(storedConfig.marksCorrect);
  const [marksIncorrect, setMarksIncorrect] = useState(storedConfig.marksIncorrect);
  const [parseMsg, setParseMsg] = useState<{ text: string; kind: 'ok' | 'err' | '' }>({ text: '', kind: '' });

  // Milestone 7: debounced autosave trigger on rawInput + every Setup
  // config field change (HANDOFF Section 11). Skips the very first run so
  // mounting this screen doesn't immediately schedule a redundant write.
  const isFirstAutosaveRun = useRef(true);
  useEffect(() => {
    if (isFirstAutosaveRun.current) {
      isFirstAutosaveRun.current = false;
      return;
    }
    persistFieldsToStore(rawInput);
    scheduleAutosave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawInput, roomSize, perSlide, secsPerQ, numSets, marksCorrect, marksIncorrect]);

  function handleNumSetsChange(value: number) {
    setNumSets(value);
    // Source L1475-1480: unconditional overwrite, every time, including no
    // check for a prior manual edit.
    setPerSlide(PERSLIDE_BY_SETS[value] ?? 2);
  }

  function persistFieldsToStore(nextRawInput: string) {
    setRawInputInStore(nextRawInput);
    setConfigInStore({
      roomSize, perSlide, secsPerQ, numSets, marksCorrect, marksIncorrect,
      qsize: storedConfig.qsize, optsize: storedConfig.optsize,
    });
  }

  function handleLoadSample() {
    setRawInput(SAMPLE_QUESTION_TEXT);
  }

  function handleExportAiPrompt() {
    downloadTextFile('mcq-format-ai-prompt.txt', buildAiPromptText());
  }

  function handleBuild() {
    const parsed = parseQuestions(rawInput);
    if (parsed.questions.length === 0) {
      setParseMsg({
        kind: 'err',
        text: 'No valid questions found. Check the format (each question needs at least 2 lettered options).',
      });
      return;
    }

    const clampedPerSlide = Math.max(1, perSlide || 4);
    const clampedSecsPerQ = Math.max(5, secsPerQ || 40);
    const preset = ROOM_PRESETS[roomSize];

    const finalConfig: AppConfig = {
      roomSize,
      perSlide: clampedPerSlide,
      secsPerQ: clampedSecsPerQ,
      numSets: numSets || 1,
      qsize: preset.qsize,
      optsize: preset.optsize,
      marksCorrect: Number.isNaN(marksCorrect) ? 1 : marksCorrect,
      marksIncorrect: Number.isNaN(marksIncorrect) ? 0 : marksIncorrect,
    };

    setConfigInStore(finalConfig);
    setRawInputInStore(rawInput);
    setPendingQuestionsInStore(parsed.questions, {
      skipped: parsed.skipped,
      invalidAnswers: parsed.invalidAnswers,
    });

    let text = `Loaded ${parsed.questions.length} questions, ${finalConfig.numSets} set(s) ready. Opening calibration screen…`;
    let hasWarning = false;
    if (parsed.skipped.length) {
      hasWarning = true;
      text += ` ⚠ Skipped ${parsed.skipped.length} block(s) with fewer than 2 options — ${parsed.skipped.slice(0, 3).join('; ')}${parsed.skipped.length > 3 ? '; …' : ''}`;
    }
    if (parsed.invalidAnswers.length) {
      hasWarning = true;
      text += ` ⚠ Answer marker didn't match any option (left blank in key) for: ${parsed.invalidAnswers.slice(0, 3).join('; ')}${parsed.invalidAnswers.length > 3 ? '; …' : ''}`;
    }
    setParseMsg({ kind: hasWarning ? 'err' : 'ok', text });

    // Milestone 7: Setup's "Build slideshow ->" is both an immediate
    // (non-debounced) autosave trigger and the second Last-used-settings
    // commit point, fired with the actual FINAL built config — HANDOFF
    // Section 11.
    saveAutosave();
    commitLastSettings(useExamStore.getState().meta, finalConfig);

    // Milestone 5 replaces the 'show' placeholder with the real
    // calibration screen; the store now holds everything it needs.
    setScreen('show');
  }

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <span className={styles.backLink} onClick={() => setScreen('meta')}>
          ← Edit exam details
        </span>

        <ResumeBanner />

        <h1 className={styles.title}>MCQ Projector — Exam Display</h1>
        <p className={styles.sub}>
          Paste your question bank once, set a few options, then project full-screen. No printing needed.
        </p>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="rawInput">1. Paste your questions</label>
          <textarea
            id="rawInput"
            className={`${styles.control} ${styles.textarea}`}
            placeholder="Paste questions here — one blank line between each question. See format below."
            value={rawInput}
            onChange={(e) => {
              setRawInput(e.target.value);
              persistFieldsToStore(e.target.value);
            }}
          />
          <div className={styles.help}>
            Format for each question (separate questions with a blank line):
            <br />
            <code>What is the capital of France?<br />A. Berlin<br />B. Madrid<br />C. Paris<br />D. Rome<br />*C</code>
            <br />
            The answer line is optional and can be written either as <code>*C</code> or <code>Answer: C</code> — include it only if you want an auto-generated answer key at the end.{' '}
            <span className={styles.sampleToggle} onClick={handleLoadSample}>
              Load a sample to see the format →
            </span>
          </div>
          <button type="button" className={styles.ghostBtn} onClick={handleExportAiPrompt}>
            📋 Export AI reformatting prompt (.txt)
          </button>
          <div className={styles.help} style={{ marginTop: 6 }}>
            Already have a finished exam paper written elsewhere (Word, a PDF you typed up, etc.)? Download this
            prompt, open an AI chat tool, paste the prompt in and also attach/upload your exam file — then paste
            the AI&apos;s reformatted output straight into the box above. No manual retyping needed.
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="roomSize">2. Room size</label>
            <select
              id="roomSize"
              className={styles.control}
              value={roomSize}
              onChange={(e) => setRoomSize(e.target.value as AppConfig['roomSize'])}
            >
              <option value="small">Small room (front rows close)</option>
              <option value="medium">Medium classroom</option>
              <option value="large">Large hall</option>
            </select>
            <div className={styles.help}>Adjusts default text size and suggested questions per screen.</div>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="perSlide">3. Questions per screen</label>
            <input
              id="perSlide"
              className={styles.control}
              type="number"
              min={1}
              max={10}
              value={perSlide}
              onChange={(e) => setPerSlide(Number(e.target.value))}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="secsPerQ">4. Seconds per question</label>
            <input
              id="secsPerQ"
              className={styles.control}
              type="number"
              min={5}
              max={600}
              value={secsPerQ}
              onChange={(e) => setSecsPerQ(Number(e.target.value))}
            />
            <div className={styles.help}>Total time per screen = questions per screen × seconds per question.</div>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="numSets">5. Number of scrambled sets</label>
            <select
              id="numSets"
              className={styles.control}
              value={numSets}
              onChange={(e) => handleNumSetsChange(Number(e.target.value))}
            >
              <option value={1}>1 (no scrambling)</option>
              <option value={2}>2 sets (A, B)</option>
              <option value={3}>3 sets (A–C)</option>
              <option value={4}>4 sets (A–D)</option>
              <option value={5}>5 sets (A–E)</option>
              <option value={6}>6 sets (A–F)</option>
              <option value={7}>7 sets (A–G)</option>
              <option value={8}>8 sets (A–H)</option>
            </select>
            <div className={styles.help}>
              Each set is labeled A, B, C... and gets its own random question order AND random option order — but
              every set is numbered 1, 2, 3... sequentially on screen, just like a normal test, so students always
              answer against a clean running number. Seat neighbors on different sets to discourage copying. An
              answer key mapping each position back to your original question bank is available at the end.
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="marksCorrect">6. Marks for correct answer</label>
            <input
              id="marksCorrect"
              className={styles.control}
              type="number"
              step={0.5}
              value={marksCorrect}
              onChange={(e) => setMarksCorrect(Number(e.target.value))}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="marksIncorrect">7. Marks for incorrect answer</label>
            <input
              id="marksIncorrect"
              className={styles.control}
              type="number"
              step={0.5}
              value={marksIncorrect}
              onChange={(e) => setMarksIncorrect(Number(e.target.value))}
            />
            <div className={styles.help}>
              Use a negative number for negative marking (e.g. -0.25). These are exported into the answer-key CSV.
            </div>
          </div>
        </div>

        <button className={styles.primaryBtn} onClick={handleBuild}>Build slideshow →</button>
        <div className={styles.help} style={{ marginTop: 8 }}>
          Clicking this opens a <b>calibration screen</b> with sample questions first — adjust font size and layout,
          then start the real timed exam when ready.
        </div>
        {parseMsg.text && (
          <div className={`${styles.parseMsg} ${parseMsg.kind === 'err' ? styles.err : parseMsg.kind === 'ok' ? styles.ok : ''}`}>
            {parseMsg.text}
          </div>
        )}
      </div>
    </div>
  );
}
```

## File: components\screens\SetupScreen\SetupScreen.module.css
```css
.screen { display: flex; flex-direction: column; min-height: 100vh; padding: 40px 24px; align-items: center; }
.card { max-width: 760px; margin: 0 auto; width: 100%; }
.backLink { display: inline-block; margin-bottom: 14px; color: var(--accent); cursor: pointer; font-size: 14px; text-decoration: underline; }
.title { font-size: 32px; margin: 0 0 6px; letter-spacing: 0.2px; }
.sub { color: var(--chalk-dim); margin: 0 0 28px; font-size: 16px; line-height: 1.5; }
.field { margin-bottom: 22px; }
.row { display: flex; gap: 18px; flex-wrap: wrap; }
.row .field { flex: 1; min-width: 180px; }
.label { display: block; font-size: 15px; font-weight: 700; margin-bottom: 6px; color: var(--accent); }
.help { font-size: 13px; color: var(--chalk-dim); margin-top: 4px; line-height: 1.4; }
.control {
  width: 100%; background: var(--board-dark); border: 1px solid var(--rule);
  color: var(--chalk); border-radius: 8px; padding: 12px 14px;
  font-family: inherit; font-size: 15px;
}
.textarea { min-height: 220px; resize: vertical; line-height: 1.5; }
.sampleToggle { font-size: 13px; color: var(--accent); cursor: pointer; text-decoration: underline; }
.primaryBtn {
  background: var(--accent); color: #21301f; padding: 14px 26px; font-size: 17px;
  margin-top: 6px; border: none; border-radius: 8px; font-weight: 700;
  cursor: pointer; font-family: inherit;
}
.primaryBtn:hover { background: var(--accent-dim); }
.ghostBtn {
  background: transparent; border: 1px solid var(--rule); color: var(--chalk);
  padding: 10px 16px; font-size: 14px; border-radius: 8px; font-weight: 700;
  cursor: pointer; font-family: inherit; margin-top: 10px;
}
.ghostBtn:hover { border-color: var(--accent); color: var(--accent); }
.parseMsg { margin-top: 14px; font-size: 14px; color: var(--chalk-dim); }
.parseMsg.err { color: var(--danger); }
.parseMsg.ok { color: var(--ok); }
```

