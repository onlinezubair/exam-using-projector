# Discovery dump - Milestone 8 (End screen) - 2026-09-06 16:24:34

## Directory listing: components
```
components\ExamApp.tsx
components\ResumeBanner.tsx
components\screens\MetaScreen\MetaScreen.module.css
components\screens\MetaScreen\MetaScreen.test.tsx
components\screens\MetaScreen\MetaScreen.tsx
components\screens\SetupScreen\SetupScreen.module.css
components\screens\SetupScreen\SetupScreen.test.tsx
components\screens\SetupScreen\SetupScreen.tsx
components\screens\SlideshowScreen\Bottombar.tsx
components\screens\SlideshowScreen\CalibrationBar.tsx
components\screens\SlideshowScreen\SlideArea.tsx
components\screens\SlideshowScreen\SlideshowScreen.module.css
components\screens\SlideshowScreen\SlideshowScreen.test.tsx
components\screens\SlideshowScreen\SlideshowScreen.tsx
components\screens\SlideshowScreen\Topbar.tsx
components\subject-lookup\SubjectBrowse.tsx
components\subject-lookup\SubjectLookup.module.css
components\subject-lookup\SubjectSearch.tsx
```

## Directory listing: components\screens
```
components\screens\MetaScreen\MetaScreen.module.css
components\screens\MetaScreen\MetaScreen.test.tsx
components\screens\MetaScreen\MetaScreen.tsx
components\screens\SetupScreen\SetupScreen.module.css
components\screens\SetupScreen\SetupScreen.test.tsx
components\screens\SetupScreen\SetupScreen.tsx
components\screens\SlideshowScreen\Bottombar.tsx
components\screens\SlideshowScreen\CalibrationBar.tsx
components\screens\SlideshowScreen\SlideArea.tsx
components\screens\SlideshowScreen\SlideshowScreen.module.css
components\screens\SlideshowScreen\SlideshowScreen.test.tsx
components\screens\SlideshowScreen\SlideshowScreen.tsx
components\screens\SlideshowScreen\Topbar.tsx
```

## Directory listing: lib
```
lib\aiPrompt.ts
lib\courses.test.ts
lib\courses.ts
lib\demoQuestions.ts
lib\meta.test.ts
lib\meta.ts
lib\parser.test.ts
lib\parser.ts
lib\shuffle.test.ts
lib\shuffle.ts
lib\storage.ts
lib\time.ts
```

## Directory listing: store
```
store\examStore.ts
store\persistence.test.ts
store\persistence.ts
```

## File: app\page.tsx
```tsx
import { ExamApp } from '@/components/ExamApp';

export default function Home() {
  return <ExamApp />;
}
```

## File: app\layout.tsx
```tsx
import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import "./theme.css";
import "./globals.css";

const atkinson = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-atkinson",
});

export const metadata: Metadata = {
  title: "MCQ Projector",
  description: "Projector-based timed MCQ exam tool",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={atkinson.variable}>{children}</body>
    </html>
  );
}

```

## File: app\globals.css
```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

html {
  height: 100%;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}

body {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  color: var(--foreground);
  background: var(--background);
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
}

body {
  font-family: var(--font-atkinson), 'Segoe UI', system-ui, sans-serif;
  background: var(--board);
  color: var(--chalk);
}

```

## File: app\theme.css
```css
:root {
  --board: #1f3329;
  --board-dark: #16241d;
  --chalk: #f4f1e6;
  --chalk-dim: #cfd0c4;
  --accent: #f2c94c;
  --accent-dim: #d9a441;
  --danger: #e2665a;
  --ok: #7fbf7f;
  --rule: rgba(244,241,230,0.18);
}

```

## File: components\ExamApp.tsx
```tsx
'use client';

import { useEffect, useState } from 'react';
import { useExamStore } from '@/store/examStore';
import { loadLastSettings, checkAutosave } from '@/store/persistence';
import { MetaScreen } from '@/components/screens/MetaScreen/MetaScreen';
import { SetupScreen } from '@/components/screens/SetupScreen/SetupScreen';
import { SlideshowScreen } from '@/components/screens/SlideshowScreen/SlideshowScreen';

// Screen state machine — screens are in-memory state, not routes, matching
// the original single-page feel (plan Section 16, Open Decision 3).
//
// Milestone 7: source's load order (L2123-2126) is loadLastSettings() then
// checkAutosave(), with autosave winning if present. Gated behind
// `hydrated` so screens mount only once their initial store values are
// final — otherwise e.g. MetaScreen's `useState(storedMeta.program || ...)`
// initializers would capture pre-hydration defaults and never pick up the
// just-loaded sticky settings (plan Section 8: "Resume banner logic runs
// once on mount, after hydration, to avoid a flash of the wrong screen").
export function ExamApp() {
  const screen = useExamStore((s) => s.screen);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    loadLastSettings();
    checkAutosave();
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  switch (screen) {
    case 'meta':
      return <MetaScreen />;
    case 'setup':
      return <SetupScreen />;
    case 'show':
      return <SlideshowScreen />;
    default:
      return <div style={{ padding: 40, color: 'var(--chalk)' }}>Screen &quot;{screen}&quot; not built yet.</div>;
  }
}
```

## File: components\ResumeBanner.tsx
```tsx
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
```

## File: store\examStore.ts
```ts
import { create } from 'zustand';
import type { ExamMeta, Screen, AppConfig, Question } from '@/types';
import { DEFAULT_META, DEFAULT_CONFIG } from '@/types';
import { buildSet, type SetQuestion } from '@/lib/shuffle';
import { buildDemoQuestions } from '@/lib/demoQuestions';
import { nowLocalForInput } from '@/lib/meta';
import { clearAutosave, saveAutosave, isRecoverableExam } from '@/store/persistence';
import type { AutosavePayload, AutosaveExamState } from '@/lib/storage';

interface ParseWarnings {
  skipped: string[];
  invalidAnswers: string[];
}

// Live per-slide/font clamps used ONLY on the Slideshow screen (calibration
// + real exam) — deliberately different range from the Setup screen's own
// perSlide <input min=1 max=10>. Source: PER_SLIDE_MIN/MAX (L1440-1441),
// adjustFont clamps (L1431-1432).
const PER_SLIDE_MIN = 2;
const PER_SLIDE_MAX = 5;
const QSIZE_MIN = 14;
const QSIZE_MAX = 60;
const OPTSIZE_MIN = 12;
const OPTSIZE_MAX = 48;

// Source: computeTotalDuration() (L1256-1265). Sums per-slide durations,
// accounting for the last slide's possibly-smaller question count.
function computeTotalDurationFor(
  masterQuestionsLength: number,
  slideCount: number,
  perSlide: number,
  secsPerQ: number
): number {
  let total = 0;
  let remaining = masterQuestionsLength;
  for (let s = 0; s < slideCount; s++) {
    const count = Math.min(perSlide, remaining);
    total += count * secsPerQ;
    remaining -= count;
  }
  return total;
}

// Duration (in seconds) of the slide at `index`, given the ACTUAL number of
// questions on that screen (the last screen may have fewer than perSlide).
// Source: the qCountThisSlide/slideDuration lines inside renderSlide()
// (L1866-1870).
function computeSlideDurationFor(
  index: number,
  masterQuestionsLength: number,
  perSlide: number,
  secsPerQ: number
): number {
  const start = index * perSlide;
  const end = Math.min(start + perSlide, masterQuestionsLength);
  return (end - start) * secsPerQ;
}

// Source: beep() (L1888-1900). Each call makes its own fresh AudioContext —
// deliberate, avoids a shared context silently failing under iOS/Safari
// autoplay-gesture restrictions. Wrapped in try/catch exactly like source;
// in test environments (jsdom, no AudioContext) this silently no-ops.
function beep(freq: number, dur: number): void {
  try {
    const AudioCtx =
      (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext })
        .AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    osc.start();
    osc.stop(ctx.currentTime + dur);
  } catch {
    // Intentionally silent — matches source's empty catch(e){}.
  }
}

interface ExamStoreState {
  screen: Screen;
  meta: ExamMeta;
  config: AppConfig;
  rawInput: string;
  pendingQuestions: Question[];
  parseWarnings: ParseWarnings;

  // ---- Slideshow / calibration (Milestone 5) ----
  masterQuestions: Question[];
  sets: SetQuestion[][];
  calibrating: boolean;
  slideIndex: number;
  slideCount: number;

  // ---- Real exam timer (Milestone 6a) ----
  paused: boolean;
  slideDuration: number; // seconds allotted to the current slide
  timeLeft: number; // seconds remaining on the current slide
  totalElapsed: number; // seconds elapsed across the whole exam
  totalDuration: number; // seconds for the whole exam
  timerId: ReturnType<typeof setInterval> | null;

  // ---- Persistence / crash-recovery (Milestone 7) ----
  resumeData: AutosavePayload | null;

  setScreen: (screen: Screen) => void;
  setMeta: (meta: ExamMeta) => void;
  setConfig: (config: AppConfig) => void;
  setRawInput: (raw: string) => void;
  setPendingQuestions: (questions: Question[], warnings: ParseWarnings) => void;

  // Builds the 12 demo questions + `numSets` shuffled columns and switches
  // into calibration mode. Source: startCalibration() (L1713-1730).
  // Re-callable: rebuilds fresh demo sets every time, matching source.
  startCalibration: () => void;
  // Source: beginRealExam() (L1732-1759). Swaps pendingQuestions into
  // masterQuestions, builds real sets, refreshes meta.date unless it was
  // manually set, computes totalDuration, and starts the timer.
  beginRealExam: () => void;
  // ±2px, clamped 14-60 (questions) / 12-48 (options). Source: adjustFont()
  // (L1430-1437).
  adjustFont: (delta: number) => void;
  // Clamped 2-5, preserves the approximate on-screen starting question.
  // No-op before anything has been built. During a real exam it also
  // recomputes totalDuration and the current slide's timeLeft, matching
  // source's adjustPerSlide() (L1448-1463).
  adjustPerSlide: (delta: number) => void;
  // Source: goNextSlide()/goPrevSlide() (L1926-1943). During a real exam,
  // advancing past the last slide stops the timer and moves to the end
  // screen (source: showEndScreen(), L1931-1934, L2010-2016 — the full
  // answer-key end screen itself is a later milestone, so this only routes
  // screen -> 'end' for now).
  goNextSlide: () => void;
  goPrevSlide: () => void;
  // Source: tick() (L1902-1915). One second of the countdown. No-ops while
  // paused. Warning beep at timeLeft===10, transition beep + auto-advance
  // at timeLeft<=0.
  tick: () => void;
  // Source: startTimer()/stopTimer() (L1917-1924).
  startTimer: () => void;
  stopTimer: () => void;
  // Source: the pauseBtn click handler (L1956-1960).
  togglePause: () => void;
  // Source: endExamToSetup() (L1971-1977). Confirms with the teacher,
  // stops the timer, and routes back to setup. clearAutosave() is a
  // no-op for now -- Milestone 7 adds real persistence to clear.
  endExamToSetup: () => void;
  // Milestone 7: exposes the crash-recovery banner's data + actions.
  setResumeData: (data: AutosavePayload | null) => void;
  restoreAutosave: () => void;
  discardAutosave: () => void;
}

export const useExamStore = create<ExamStoreState>((set, get) => ({
  screen: 'meta',
  meta: { ...DEFAULT_META },
  config: { ...DEFAULT_CONFIG },
  rawInput: '',
  pendingQuestions: [],
  parseWarnings: { skipped: [], invalidAnswers: [] },

  masterQuestions: [],
  sets: [],
  calibrating: false,
  slideIndex: 0,
  slideCount: 0,

  paused: false,
  slideDuration: 0,
  timeLeft: 0,
  totalElapsed: 0,
  totalDuration: 0,
  timerId: null,
  resumeData: null,

  setScreen: (screen) => set({ screen }),
  setMeta: (meta) => set({ meta }),
  setConfig: (config) => set({ config }),
  setRawInput: (rawInput) => set({ rawInput }),
  setPendingQuestions: (pendingQuestions, parseWarnings) => set({ pendingQuestions, parseWarnings }),

  startCalibration: () => {
    const { config } = get();
    const demo = buildDemoQuestions();
    const sets: SetQuestion[][] = [];
    for (let s = 0; s < config.numSets; s++) sets.push(buildSet(demo));
    set({
      calibrating: true,
      masterQuestions: demo,
      sets,
      slideCount: Math.ceil(demo.length / config.perSlide),
      slideIndex: 0,
    });
  },

  beginRealExam: () => {
    const { meta, config, pendingQuestions } = get();

    // Refresh the exam date/time to the moment the real exam actually
    // starts — unless the teacher manually overrode it (source L1741-1745).
    const newMeta = meta.dateManuallySet ? meta : { ...meta, date: nowLocalForInput() };

    const masterQuestions = pendingQuestions;
    const sets: SetQuestion[][] = [];
    for (let s = 0; s < config.numSets; s++) sets.push(buildSet(masterQuestions));
    const slideCount = Math.ceil(masterQuestions.length / config.perSlide);
    const slideIndex = 0;
    const slideDuration = computeSlideDurationFor(slideIndex, masterQuestions.length, config.perSlide, config.secsPerQ);
    const totalDuration = computeTotalDurationFor(masterQuestions.length, slideCount, config.perSlide, config.secsPerQ);

    set({
      calibrating: false,
      meta: newMeta,
      masterQuestions,
      sets,
      slideCount,
      slideIndex,
      slideDuration,
      timeLeft: slideDuration,
      totalElapsed: 0,
      totalDuration,
      paused: false,
    });

    get().startTimer();
  },

  adjustFont: (delta) => {
    const { config } = get();
    const qsize = Math.min(QSIZE_MAX, Math.max(QSIZE_MIN, config.qsize + delta));
    const optsize = Math.min(OPTSIZE_MAX, Math.max(OPTSIZE_MIN, config.optsize + delta));
    set({ config: { ...config, qsize, optsize } });
    // Milestone 7: immediate autosave trigger — HANDOFF Section 11.
    saveAutosave();
  },

  adjustPerSlide: (delta) => {
    const { config, masterQuestions, slideIndex, calibrating } = get();
    if (masterQuestions.length === 0) return; // nothing built yet — source L1449
    const newPerSlide = Math.min(PER_SLIDE_MAX, Math.max(PER_SLIDE_MIN, config.perSlide + delta));
    if (newPerSlide === config.perSlide) return;
    // Keep showing (as closely as possible) the same starting question.
    const currentStart = slideIndex * config.perSlide;
    const slideCount = Math.ceil(masterQuestions.length / newPerSlide);
    const newSlideIndex = Math.min(slideCount - 1, Math.floor(currentStart / newPerSlide));

    if (calibrating) {
      set({
        config: { ...config, perSlide: newPerSlide },
        slideCount,
        slideIndex: newSlideIndex,
      });
      // Milestone 7: immediate autosave trigger — HANDOFF Section 11.
      saveAutosave();
      return;
    }

    // Mid-exam: also recompute totalDuration and the current slide's
    // timeLeft, matching source's adjustPerSlide() (L1458, and its call
    // into renderSlide() which resets timeLeft for the new slide).
    const slideDuration = computeSlideDurationFor(newSlideIndex, masterQuestions.length, newPerSlide, config.secsPerQ);
    const totalDuration = computeTotalDurationFor(masterQuestions.length, slideCount, newPerSlide, config.secsPerQ);
    set({
      config: { ...config, perSlide: newPerSlide },
      slideCount,
      slideIndex: newSlideIndex,
      slideDuration,
      timeLeft: slideDuration,
      totalDuration,
    });
    // Milestone 7: immediate autosave trigger — HANDOFF Section 11.
    saveAutosave();
  },

  goNextSlide: () => {
    const { slideIndex, slideCount, calibrating } = get();
    if (slideIndex < slideCount - 1) {
      const newIndex = slideIndex + 1;
      if (calibrating) {
        set({ slideIndex: newIndex });
        return;
      }
      const { config, masterQuestions } = get();
      const slideDuration = computeSlideDurationFor(newIndex, masterQuestions.length, config.perSlide, config.secsPerQ);
      set({ slideIndex: newIndex, slideDuration, timeLeft: slideDuration });
      return;
    }
    if (!calibrating) {
      // End of the real exam — source: showEndScreen() (L1931-1934,
      // L2010-2016). The full answer-key end screen is a later milestone;
      // for now this just stops the timer and routes to the 'end' screen.
      get().stopTimer();
      // Milestone 7: reaching the End screen clears the autosave entry —
      // HANDOFF Section 11.
      clearAutosave();
      set({ screen: 'end' });
    }
    // calibrating + already on last demo screen: stay put (source L1935).
  },

  goPrevSlide: () => {
    const { slideIndex, calibrating } = get();
    if (slideIndex <= 0) return;
    const newIndex = slideIndex - 1;
    if (calibrating) {
      set({ slideIndex: newIndex });
      return;
    }
    const { config, masterQuestions } = get();
    const slideDuration = computeSlideDurationFor(newIndex, masterQuestions.length, config.perSlide, config.secsPerQ);
    set({ slideIndex: newIndex, slideDuration, timeLeft: slideDuration });
  },

  tick: () => {
    const { paused, timeLeft, totalElapsed } = get();
    if (paused) return;
    const newTimeLeft = timeLeft - 1;
    const newTotalElapsed = totalElapsed + 1;
    if (newTimeLeft === 10) beep(440, 0.15);
    if (newTimeLeft <= 0) {
      beep(660, 0.25);
      set({ timeLeft: newTimeLeft, totalElapsed: newTotalElapsed });
      // Milestone 7: every timer tick is an immediate (non-debounced)
      // autosave trigger — HANDOFF Section 11.
      saveAutosave();
      get().goNextSlide();
      return;
    }
    set({ timeLeft: newTimeLeft, totalElapsed: newTotalElapsed });
    saveAutosave();
  },

  startTimer: () => {
    get().stopTimer();
    const id = setInterval(() => get().tick(), 1000);
    set({ timerId: id });
  },

  stopTimer: () => {
    const { timerId } = get();
    if (timerId) clearInterval(timerId);
    set({ timerId: null });
  },

  togglePause: () => set((state) => ({ paused: !state.paused })),

  endExamToSetup: () => {
    if (
      typeof window !== 'undefined' &&
      !window.confirm('This will end the current exam display and return to setup. Are you sure?')
    ) {
      return;
    }
    get().stopTimer();
    clearAutosave();
    set({ screen: 'setup' });
  },

  setResumeData: (resumeData) => set({ resumeData }),

  // Source: restoreAutosave(data) (~L1240-1250). Restores raw text +
  // config + meta always; if the saved session was a real in-progress exam
  // (not just a pasted bank), also jumps straight into a PAUSED Slideshow
  // screen with the timer started (tick() no-ops while paused, matching
  // "timer started but immediately paused").
  restoreAutosave: () => {
    const { resumeData } = get();
    if (!resumeData) return;

    if (isRecoverableExam(resumeData.exam)) {
      const exam: AutosaveExamState = resumeData.exam;
      set({
        rawInput: resumeData.raw,
        config: resumeData.config,
        meta: resumeData.meta,
        masterQuestions: exam.masterQuestions,
        sets: exam.sets,
        slideIndex: exam.slideIndex,
        slideCount: exam.slideCount,
        timeLeft: exam.timeLeft,
        slideDuration: exam.slideDuration,
        totalElapsed: exam.totalElapsed,
        totalDuration: exam.totalDuration,
        paused: true,
        calibrating: false,
        screen: 'show',
        resumeData: null,
      });
      get().startTimer();
      return;
    }

    set({
      rawInput: resumeData.raw,
      config: resumeData.config,
      meta: resumeData.meta,
      screen: 'setup',
      resumeData: null,
    });
  },

  // Source: the "Discard & start fresh" click (L1250), confirm-gated.
  // Last-used settings are left untouched by discard.
  discardAutosave: () => {
    if (
      typeof window !== 'undefined' &&
      !window.confirm(
        'This will permanently discard the recovered question bank / exam progress. Are you sure?'
      )
    ) {
      return;
    }
    clearAutosave();
    set({ resumeData: null });
  },
}));
```

## File: store\persistence.ts
```ts
import { useExamStore } from '@/store/examStore';
import type { ExamMeta, AppConfig } from '@/types';
import {
  readAutosave,
  writeAutosave,
  clearAutosaveStorage,
  readLastSettings,
  writeLastSettings,
} from '@/lib/storage';
import type { AutosavePayload, AutosaveExamState, LastSettingsPayload, LastSettingsMeta } from '@/lib/storage';
import { nowLocalForInput } from '@/lib/meta';

// NOTE on the store<->persistence circular import: examStore.ts calls
// clearAutosave()/saveAutosave()/isRecoverableExam() from this module (for
// endExamToSetup(), tick(), adjustFont(), adjustPerSlide(), and
// restoreAutosave()), and this module reads/writes examStore state via
// useExamStore.getState()/setState(). Both sides only touch the other
// module's exports inside function bodies (never at module-evaluation
// time), which ES modules resolve correctly even in a cycle.

// ---- Autosave -------------------------------------------------------------

// Source: buildAutosavePayload() (L1060-1090). Calibration state is never
// persisted as a recoverable session.
function buildAutosavePayload(): AutosavePayload {
  const state = useExamStore.getState();
  return {
    savedAt: Date.now(),
    raw: state.rawInput,
    config: state.config,
    meta: state.meta,
    exam: state.calibrating
      ? { inShow: false }
      : {
          masterQuestions: state.masterQuestions,
          sets: state.sets,
          slideIndex: state.slideIndex,
          slideCount: state.slideCount,
          timeLeft: state.timeLeft,
          slideDuration: state.slideDuration,
          totalElapsed: state.totalElapsed,
          totalDuration: state.totalDuration,
          paused: state.paused,
          inShow: state.screen === 'show',
        },
  };
}

export function saveAutosave(): void {
  if (typeof window === 'undefined') return;
  writeAutosave(buildAutosavePayload());
}

let autosaveDebounceId: ReturnType<typeof setTimeout> | null = null;

// Source: scheduleAutosave() (L1102-1106) — 500ms debounce, attached to
// rawInput and Setup-screen config field changes.
export function scheduleAutosave(): void {
  if (typeof window === 'undefined') return;
  if (autosaveDebounceId) clearTimeout(autosaveDebounceId);
  autosaveDebounceId = setTimeout(() => {
    autosaveDebounceId = null;
    saveAutosave();
  }, 500);
}

// Source: clearAutosave() (L1098-1100). Cancels any pending debounced
// write too, so a stale save can't land after an explicit clear.
export function clearAutosave(): void {
  if (autosaveDebounceId) {
    clearTimeout(autosaveDebounceId);
    autosaveDebounceId = null;
  }
  clearAutosaveStorage();
}

export function isRecoverableExam(
  exam: AutosavePayload['exam']
): exam is AutosaveExamState {
  return 'masterQuestions' in exam && exam.masterQuestions.length > 0;
}

// ---- Last-used settings -------------------------------------------------

// Source: saveLastSettings()/buildLastSettingsPayload() (L1115-1139). Per
// the plan doc's deliberate divergence (Section 8) from source's literal
// per-field debounce, this fires ONLY from two commit points: MetaScreen's
// "Next ->" (meta only — `config` here defaults to whatever the store
// currently holds) and SetupScreen's "Build slideshow ->" (meta + the
// final built config, passed explicitly).
export function commitLastSettings(meta: ExamMeta, config?: AppConfig): void {
  if (typeof window === 'undefined') return;
  const cfg = config ?? useExamStore.getState().config;
  const lastSettingsMeta: LastSettingsMeta = {
    program: meta.program,
    semester: meta.semester,
    subject: meta.subject,
    subjectCode: meta.subjectCode,
    subjectFullName: meta.subjectFullName,
    subjectMode: meta.subjectMode,
    examName: meta.examName,
    quizNumber: meta.quizNumber,
  };
  const payload: LastSettingsPayload = {
    savedAt: Date.now(),
    meta: lastSettingsMeta,
    config: cfg,
  };
  writeLastSettings(payload);
}

// Source: loadLastSettings(), called before checkAutosave() in the app's
// load order (L2123-2126). `date` always resets to "now" and
// `dateManuallySet` is always cleared — sticky settings never resurrect a
// stale timestamp.
export function loadLastSettings(): void {
  if (typeof window === 'undefined') return;
  const data = readLastSettings();
  if (!data) return;
  useExamStore.setState((state) => ({
    meta: {
      ...state.meta,
      ...data.meta,
      date: nowLocalForInput(),
      dateManuallySet: false,
    },
    config: {
      ...state.config,
      ...data.config,
    },
  }));
}

// ---- Crash-recovery check -------------------------------------------------

// Source: checkAutosave() (L1228-1253). Runs after loadLastSettings(); if
// a recoverable session exists it wins — forces navigation to Setup and
// surfaces the resume banner via `resumeData`.
export function checkAutosave(): void {
  if (typeof window === 'undefined') return;
  const data = readAutosave();
  if (!data) return;

  const hasExam = isRecoverableExam(data.exam);
  if (!data.raw && !hasExam) return;

  useExamStore.setState({ screen: 'setup', resumeData: data });
}
```

## File: lib\meta.ts
```ts
// Ported verbatim from mcq-projector_v8.html: pad2, nowLocalForInput,
// formatDateForHeader, formatDateForFilename, buildMetaLabelParts,
// buildMetaHeaderLine, buildMetaFileBase.
//
// Source reads these off a global `state.meta` object; here they take an
// explicit ExamMeta parameter instead (same fields, typed state store -
// see plan §7/§8), so behavior is unchanged but the functions are pure.

export interface ExamMeta {
  program: string;
  semester: string;
  subject: string;
  subjectCode: string;
  examName: string;
  quizNumber: string;
  date: string;
  dateManuallySet?: boolean;
}

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
```

## File: lib\shuffle.ts
```ts
// Ported verbatim from mcq-projector_v8.html: shuffle(), buildSet(),
// getSetLabel(), and the PERSLIDE_BY_SETS lookup table (§2.4 of the plan).

import type { ParsedQuestion } from "./parser";

export function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
export const SET_LETTERS = LETTERS;

export function getSetLabel(sIdx: number): string {
  return SET_LETTERS[sIdx] ?? String(sIdx + 1);
}

// Default questions-per-screen for a given number of scrambled sets (1-8).
// More side-by-side sets need a narrower per-screen count; the teacher can
// still override manually (Setup screen re-applies this only if untouched).
export const PERSLIDE_BY_SETS: Record<number, number> = {
  1: 6, 2: 5, 3: 4, 4: 3, 5: 3, 6: 2, 7: 2, 8: 2,
};

export interface SetOption {
  letter: string;
  text: string;
  origLetter: string;
}

export interface SetQuestion {
  displayNumber: number;
  origNumber: number;
  text: string;
  options: SetOption[];
  answer: string | null;
}

export function buildSet(questions: ParsedQuestion[]): SetQuestion[] {
  // Shuffle the ORDER of questions for this set...
  const orderShuffled = shuffle(questions);
  // ...and independently shuffle the OPTIONS within each question.
  return orderShuffled.map((q, idx) => {
    const shuffledOpts = shuffle(q.options);
    const newOptions: SetOption[] = shuffledOpts.map((o, i) => ({
      letter: LETTERS[i],
      text: o.text,
      origLetter: o.letter,
    }));

    let newAnswer: string | null = null;
    if (q.answer) {
      const found = newOptions.find((o) => o.origLetter === q.answer);
      newAnswer = found ? found.letter : null;
    }

    // displayNumber: the sequential 1,2,3... the student sees and writes on
    // their answer sheet - always in order, same across every set.
    // origNumber: which bank question actually sits here, kept only for the
    // teacher's answer key, never shown to students.
    return {
      displayNumber: idx + 1,
      origNumber: q.number,
      text: q.text,
      options: newOptions,
      answer: newAnswer,
    };
  });
}
```

## File: lib\time.ts
```ts
// Ported verbatim from mcq-projector_v8.html fmtTime() (L616-621).
// Pure formatter: seconds -> "MM:SS", clamped at 0 and rounded.
export function fmtTime(sec: number): string {
  const clamped = Math.max(0, Math.round(sec));
  const m = Math.floor(clamped / 60);
  const s = clamped % 60;
  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}
```

## File: lib\demoQuestions.ts
```ts
import type { Question } from '@/types';

// The 12 generic placeholder questions used by BOTH the calibration screen
// (Milestone 5) and the "Export AI reformatting prompt" worked examples
// (source: buildDemoQuestions(), mcq-projector_v8.html L1695-1711). Kept as
// a function (not a static array) so each call is a fresh, independent
// array — matches source exactly, and avoids any risk of a caller mutating
// a shared instance.
export function buildDemoQuestions(): Question[] {
  const demo: Question[] = [];
  for (let i = 1; i <= 12; i++) {
    demo.push({
      number: i,
      text: `Sample question ${i} — check that this text and the options below are readable from the back of the room.`,
      options: [
        { letter: 'A', text: 'Sample option A' },
        { letter: 'B', text: 'Sample option B' },
        { letter: 'C', text: 'Sample option C' },
        { letter: 'D', text: 'Sample option D' },
      ],
      answer: 'A',
    });
  }
  return demo;
}

// The exact 4-question worked example loaded by "Load a sample" (source
// L1502-1529). Kept verbatim, including the mixed "A)"/"Answer:" style.
export const SAMPLE_QUESTION_TEXT = `What is the chemical symbol for water?
A) H2O
B) O2
C) CO2
D) NaCl
Answer: A

Which planet is known as the Red Planet?
A) Venus
B) Mars
C) Jupiter
D) Saturn
Answer: B

Who wrote "Romeo and Juliet"?
A) Charles Dickens
B) Mark Twain
C) William Shakespeare
D) Leo Tolstoy
Answer: C

What is 7 x 8?
A) 54
B) 56
C) 58
D) 64
Answer: B`;
```

## File: lib\aiPrompt.ts
```ts
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
```

## File: next.config.ts
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  /* config options here */
};

export default nextConfig;


```

## File: package.json
```json
{
  "name": "mcq-projector",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "vitest run"
  },
  "dependencies": {
    "next": "16.3.4",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "zustand": "^5.0.15"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^7.0.1",
    "@testing-library/react": "^16.3.3",
    "@types/node": "^24.0.0",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.3.4",
    "jsdom": "^29.1.1",
    "typescript": "^5",
    "vitest": "^5.0.0"
  }
}

```

## File: vitest.config.ts
```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"],
  },
});
```

