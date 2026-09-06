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