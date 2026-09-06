import type { ExamMeta, AppConfig, Question } from '@/types';
import type { SetQuestion } from '@/lib/shuffle';

// Two independent localStorage keys — source: mcq-projector_v8.html
// L609-614. AUTOSAVE_KEY is crash/refresh recovery; LAST_SETTINGS_KEY is
// sticky defaults for next session and is never auto-cleared.
export const AUTOSAVE_KEY = 'mcqProjectorAutosave_v1';
export const LAST_SETTINGS_KEY = 'mcqProjectorLastSettings_v1';

// Shape of the `exam` block when a real (non-calibration) session exists.
// Source: buildAutosavePayload() (L1060-1090).
export interface AutosaveExamState {
  masterQuestions: Question[];
  sets: SetQuestion[][];
  slideIndex: number;
  slideCount: number;
  timeLeft: number;
  slideDuration: number;
  totalElapsed: number;
  totalDuration: number;
  paused: boolean;
  inShow: boolean;
}

export interface AutosavePayload {
  savedAt: number;
  raw: string;
  config: AppConfig;
  meta: ExamMeta;
  // Calibration state is NEVER persisted as a recoverable session — source
  // comment at L1060-1090 — so calibrating writes always shrink to just
  // `{ inShow: false }`.
  exam: AutosaveExamState | { inShow: false };
}

// Last-used settings deliberately excludes `date` — source:
// buildLastSettingsPayload() (L1115-1139). Sticky settings should never
// resurrect a stale timestamp; MetaScreen always re-derives "now" on load.
export type LastSettingsMeta = Omit<ExamMeta, 'date' | 'dateManuallySet'>;

export interface LastSettingsPayload {
  savedAt: number;
  meta: LastSettingsMeta;
  config: AppConfig;
}

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function readAutosave(): AutosavePayload | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(AUTOSAVE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AutosavePayload;
  } catch {
    return null;
  }
}

export function writeAutosave(payload: AutosavePayload): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(payload));
  } catch {
    // Storage unavailable/full — fail silently, matching source's lack of
    // user-visible error handling for localStorage writes.
  }
}

export function clearAutosaveStorage(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(AUTOSAVE_KEY);
  } catch {
    // no-op
  }
}

export function readLastSettings(): LastSettingsPayload | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(LAST_SETTINGS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LastSettingsPayload;
  } catch {
    return null;
  }
}

export function writeLastSettings(payload: LastSettingsPayload): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(LAST_SETTINGS_KEY, JSON.stringify(payload));
  } catch {
    // no-op
  }
}