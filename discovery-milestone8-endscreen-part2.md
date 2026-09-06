# Discovery dump Part 2 - Milestone 8 (End screen) - 2026-09-06 16:29:26

## Root-level file listing (non-recursive)
```
.gitignore
AGENTS.md
automation-log.md
CLAUDE.md
discovery-milestone7-part2.md
discovery-milestone7.md
discovery-milestone8-endscreen.md
eslint.config.mjs
HANDOFF.md
next-env.d.ts
next.config.ts
package-lock.json
package.json
README.md
tsconfig.json
tsconfig.tsbuildinfo
vitest.config.ts
```

## Candidate files matching 'types' anywhere in the repo (excluding node_modules)
```
types\index.ts
(dir) types
(dir) .next\types
```

## File: types.ts
*(not found at this path)*

## File: types\index.ts
```ts
// Core data model for MCQ Projector.
// Ported 1:1 from mcq-projector-nextjs-plan-v3.md Section 6 (Data Model),
// cross-checked against mcq-projector_v8.html state.meta (~L594-605).
// Extend, don't restructure, across later milestones — every screen reads
// these shapes.

export interface Option {
  letter: string;
  text: string;
  origLetter?: string;
}

export interface Question {
  number: number; // position in the original pasted bank
  text: string;
  options: Option[];
  answer: string | null;
}

export interface SetQuestion {
  displayNumber: number; // 1..N, what the student sees/writes
  origNumber: number;    // which bank question this actually is
  text: string;
  options: Option[];     // re-lettered A..H for this set
  answer: string | null; // re-lettered to match this set's options
}

// Course shape is owned by lib/courses.ts (source of truth ported in
// Milestone 2, including the digit-collision _codeDisplay rule) —
// re-exported here so every screen imports the SAME Course type from
// '@/types' instead of two incompatible ones.
export type { Course } from '@/lib/courses';

export interface ExamMeta {
  program: string;
  semester: number | '';
  subject: string;
  subjectCode: string;
  subjectFullName: string;
  subjectMode: 'browse' | 'search';
  examName: string;
  quizNumber: number | '';
  date: string;
  dateManuallySet: boolean;
}

export interface AppConfig {
  roomSize: 'small' | 'medium' | 'large';
  perSlide: number;
  secsPerQ: number;
  numSets: number;
  qsize: number;
  optsize: number;
  marksCorrect: number;
  marksIncorrect: number;
}

export type Screen = 'meta' | 'setup' | 'show' | 'end';

// Matches source's initial state.meta shape (mcq-projector_v8.html L594-605).
// `date` is intentionally '' here; the Meta screen fills it with
// nowLocalForInput() on first mount, matching source L1052-1053.
export const DEFAULT_META: ExamMeta = {
  program: 'Pharm.D',
  semester: 4,
  subject: '',
  subjectCode: '',
  subjectFullName: '',
  subjectMode: 'browse',
  examName: '',
  quizNumber: 1,
  date: '',
  dateManuallySet: false,
};

// Matches source's initial `state` config fields (mcq-projector_v8.html
// L575-581) and the Setup screen's HTML defaults (roomSize "medium" is the
// select's default `selected` option, L457). NOTE: perSlide here is 5, not
// the Setup input's static HTML value="4" (L464) — source immediately calls
// applyPerSlideDefaultForSets() once at load (L1480), which overwrites it
// to PERSLIDE_BY_SETS[numSets=2] = 5. That is the real effective default.
export const DEFAULT_CONFIG: AppConfig = {
  roomSize: 'medium',
  perSlide: 5,
  secsPerQ: 40,
  numSets: 2,
  qsize: 30,
  optsize: 23,
  marksCorrect: 1,
  marksIncorrect: 0,
};

```

## File: lib\storage.ts
```ts
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
```

## File: lib\parser.ts
```ts
// Ported verbatim from mcq-projector_v8.html: parseQuestions()
// Blocks are separated by a blank line. Within a block, question text lines
// may span multiple lines (joined with spaces); option lines match
// ^([A-Za-z])[).]\s*(.+)$ ; one optional answer line as "Answer: X" or "*X".

export interface ParsedOption {
  letter: string;
  text: string;
}

export interface ParsedQuestion {
  number: number;
  text: string;
  options: ParsedOption[];
  answer: string | null;
}

export interface ParseResult {
  questions: ParsedQuestion[];
  skipped: string[];
  invalidAnswers: string[];
}

export function parseQuestions(raw: string): ParseResult {
  const blocks = raw
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  const out: ParsedQuestion[] = [];
  const skipped: string[] = [];
  const invalidAnswers: string[] = [];

  blocks.forEach((block, idx) => {
    const lines = block
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    const qLines: string[] = [];
    const options: ParsedOption[] = [];
    let answer: string | null = null;

    lines.forEach((line) => {
      const ansMatch = line.match(/^answer\s*[:=]\s*([A-Za-z])/i);
      const starMatch = line.match(/^\*\s*([A-Za-z])\s*$/);
      const optMatch = line.match(/^([A-Za-z])[).]\s*(.+)$/);

      if (ansMatch) {
        answer = ansMatch[1].toUpperCase();
      } else if (starMatch) {
        answer = starMatch[1].toUpperCase();
      } else if (optMatch) {
        options.push({ letter: optMatch[1].toUpperCase(), text: optMatch[2].trim() });
      } else {
        qLines.push(line);
      }
    });

    if (options.length >= 2) {
      if (answer && !options.some((o) => o.letter === answer)) {
        invalidAnswers.push(`Q${idx + 1} (marked "${answer}", not among its options)`);
        answer = null;
      }
      out.push({ number: idx + 1, text: qLines.join(' '), options, answer });
    } else {
      const preview = (qLines.join(' ') || block).slice(0, 40);
      skipped.push(`Block ${idx + 1}: "${preview}${preview.length === 40 ? '…' : ''}"`);
    }
  });

  return { questions: out, skipped, invalidAnswers };
}
```

## File: lib\courses.ts
```ts
// Ported verbatim from mcq-projector_v8.html: RAW_COURSES + buildCourseIndex
// collision rule + getCoursesFor/sortedByShortName/sortedByCode/defaultCourseFor.
// Course entries have no explicit "program" field in source - COURSES_BY_KEY
// is keyed as 'Pharm.D|<semester>' regardless, so any other program (e.g.
// "FSc") correctly falls back to null (free-text Subject input in the UI).

export interface Course {
  semester: number;
  shortName: string;
  code: string;
  fullName: string;
  _id?: string;
  _isLab?: boolean;
  _codeDigitsValue?: number;
  _codeDisplay?: string;
}

export const RAW_COURSES: Course[] = [
  { semester: 1, shortName: "Functional English", code: "GEN-101", fullName: "Functional English" },
  { semester: 1, shortName: "Physical Pharmacy-I", code: "PPD-101", fullName: "Physical Pharmacy-I" },
  { semester: 1, shortName: "Physical Pharmacy-I (Lab)", code: "PPD-101-L", fullName: "Physical Pharmacy-I (Lab)" },
  { semester: 1, shortName: "Organic Chemistry-I", code: "PPD-102", fullName: "Organic Chemistry-I" },
  { semester: 1, shortName: "Organic Chemistry-I (Lab)", code: "PPD-102-L", fullName: "Organic Chemistry-I (Lab)" },
  { semester: 1, shortName: "Biochemistry-I", code: "PPD-103", fullName: "Biochemistry-I" },
  { semester: 1, shortName: "Biochemistry-I (Lab)", code: "PPD-103-L", fullName: "Biochemistry-I (Lab)" },
  { semester: 1, shortName: "Physiology-I", code: "PID-101", fullName: "Physiology-I" },
  { semester: 1, shortName: "Physiology-I (Lab)", code: "PID-101-L", fullName: "Physiology-I (Lab)" },
  { semester: 3, shortName: "Islamic Studies", code: "IS402", fullName: "Islamic Studies" },
  { semester: 3, shortName: "Dosage Forms Science", code: "PHARM410", fullName: "Pharmaceutics-IIA (Dosage Forms Science)" },
  { semester: 3, shortName: "Dosage Forms Science Lab", code: "PHARM410 LAB", fullName: "Pharmaceutics-IIA (Dosage Forms Science) LAB" },
  { semester: 3, shortName: "Pharmaceutical Microbiology & Immunology", code: "PHARM411", fullName: "Pharmaceutics-IIIA (Pharmaceutical Microbiology & Immunology)" },
  { semester: 3, shortName: "Pharmaceutical Microbiology & Immunology Lab", code: "PHARM411 LAB", fullName: "Pharmaceutics-IIIA (Pharmaceutical Microbiology & Immunology) LAB" },
  { semester: 3, shortName: "Pharmacology and Therapeutics-IA", code: "PHARM412", fullName: "Pharmacology and Therapeutics-IA" },
  { semester: 3, shortName: "Pharmacology and Therapeutics-IA LAB", code: "PHARM412 LAB", fullName: "Pharmacology and Therapeutics-IA LAB" },
  { semester: 3, shortName: "Pharmacognosy-IA (Basic)", code: "PHARM413", fullName: "Pharmacognosy-IA (Basic)" },
  { semester: 3, shortName: "Pharmacognosy-IA (Basic) LAB", code: "PHARM413 LAB", fullName: "Pharmacognosy-IA (Basic) LAB" },
  { semester: 3, shortName: "Pharmaceutical Mathematics", code: "PHARM414", fullName: "Pharmacy Practice-IA (Pharmaceutical Mathematics)" },
  { semester: 5, shortName: "Dispensing Pharmacy", code: "PHARM510", fullName: "Pharmacy Practice-IIA (Dispensing Pharmacy)" },
  { semester: 5, shortName: "Dispensing Pharmacy Lab", code: "PHARM510 LAB", fullName: "Pharmacy Practice-IIA (Dispensing Pharmacy) Lab" },
  { semester: 5, shortName: "Pharmaceutical Analysis", code: "PHARM511", fullName: "Pharmaceutical Chemistry-IIIA (Pharmaceutical Analysis)" },
  { semester: 5, shortName: "Pharmaceutical Analysis Lab", code: "PHARM511 LAB", fullName: "Pharmaceutical Chemistry-IIIA (Pharmaceutical Analysis) LAB" },
  { semester: 5, shortName: "Pharmacology and Therapeutics-IIA", code: "PHARM512", fullName: "Pharmacology and Therapeutics-IIA" },
  { semester: 5, shortName: "Pharmacology and Therapeutics-IIA LAB", code: "PHARM512 LAB", fullName: "Pharmacology and Therapeutics-IIA LAB" },
  { semester: 5, shortName: "Pharmacognosy-IIA (Advanced)", code: "PHARM513", fullName: "Pharmacognosy-IIA (Advanced)" },
  { semester: 5, shortName: "Pharmacognosy-IIA (Advanced) LAB", code: "PHARM513 LAB", fullName: "Pharmacognosy-IIA (Advanced) LAB" },
  { semester: 5, shortName: "Pathology", code: "PHARM514", fullName: "Pathology" },
  { semester: 5, shortName: "Pathology LAB", code: "PHARM514 LAB", fullName: "Pathology LAB" },
  { semester: 7, shortName: "Hospital Pharmacy", code: "PHARM610", fullName: "Pharmacy Practice-IVA (Hospital Pharmacy)" },
  { semester: 7, shortName: "Clinical Pharmacy-I", code: "PHARM611", fullName: "Pharmacy Practice-VA (Clinical Pharmacy-I)" },
  { semester: 7, shortName: "Clinical Pharmacy-I Lab", code: "PHARM611 LAB", fullName: "Pharmacy Practice-VA (Clinical Pharmacy-I) LAB" },
  { semester: 7, shortName: "Industrial Pharmacy", code: "PHARM612", fullName: "Pharmaceutics-IVA (Industrial Pharmacy)" },
  { semester: 7, shortName: "Industrial Pharmacy Lab", code: "PHARM612 LAB", fullName: "Pharmaceutics-IVA (Industrial Pharmacy) LAB" },
  { semester: 7, shortName: "Biopharmaceutics & Pharmacokinetics", code: "PHARM613", fullName: "Pharmaceutics-VA (Biopharmaceutics & Pharmacokinetics)" },
  { semester: 7, shortName: "Biopharmaceutics & Pharmacokinetics Lab", code: "PHARM613 LAB", fullName: "Pharmaceutics-VA (Biopharmaceutics & Pharmacokinetics) LAB" },
  { semester: 7, shortName: "Pharmaceutical Quality Management", code: "PHARM614", fullName: "Pharmaceutics-VIA (Pharmaceutical Quality Management)" },
  { semester: 7, shortName: "Pharmaceutical Quality Management Lab", code: "PHARM614 LAB", fullName: "Pharmaceutics-VIA (Pharmaceutical Quality Management) LAB" },
  { semester: 9, shortName: "Pharmaceutical Technology", code: "PHARM 710", fullName: "Pharmaceutics-VIIA (Pharmaceutical Technology)" },
  { semester: 9, shortName: "Pharmaceutical Technology Lab", code: "PHARM 710 LAB", fullName: "Pharmaceutics-VIIA (Pharmaceutical Technology) LAB" },
  { semester: 9, shortName: "Advanced Clinical Pharmacy-II", code: "PHARM 711", fullName: "Pharmacy Practice-VIA (Advanced Clinical Pharmacy-II)" },
  { semester: 9, shortName: "Advanced Clinical Pharmacy-II Lab", code: "PHARM 711 LAB", fullName: "Pharmacy Practice-VIA (Advanced Clinical Pharmacy-II) LAB" },
  { semester: 9, shortName: "Forensic Pharmacy", code: "PHARM 712", fullName: "Pharmacy Practice-VIIA (Forensic Pharmacy)" },
  { semester: 9, shortName: "Pharmaceutical Management & Marketing", code: "PHARM 713", fullName: "Pharmacy Practice-VIIIA (Pharmaceutical Management & Marketing)" },
  { semester: 9, shortName: "Medicinal Chemistry", code: "PHARM 714", fullName: "Pharmaceutical Chemistry-IVA (Medicinal Chemistry)" },
  { semester: 9, shortName: "Medicinal Chemistry Lab", code: "PHARM 714 LAB", fullName: "Pharmaceutical Chemistry-IVA (Medicinal Chemistry) LAB" },
  { semester: 4, shortName: "Applied Pharmaceutical Microbiology & Immunology", code: "PHARM416", fullName: "Pharmaceutics-IIIA (Applied Pharmaceutical Microbiology & Immunology)" },
];

// Theory/Lab pairs share a code prefix (e.g. PHARM410 / PHARM410 LAB, or
// PPD-101 / PPD-101-L). Stripping that suffix recovers the shared base.
export function stripLabSuffix(code: string): string {
  return code.replace(/\s*-\s*L$/i, '').replace(/\s+LAB$/i, '').trim();
}

export function isLabCode(code: string): boolean {
  return /-L$/i.test(code.trim()) || /\bLAB$/i.test(code.trim());
}

// Keyed "Program|Semester" -> array of course objects, each enriched with:
//   _id               unique id used to sync the two Browse dropdowns
//   _isLab            true for a Lab row
//   _codeDigitsValue  numeric value of the code's digits, for sorting
//   _codeDisplay      what the Code dropdown shows (see collision rule below)
//
// Collision rule: stripping a code down to its digits normally yields a
// clean bare number (410, 411...). But within Semester 1, GEN-101, PPD-101
// and PID-101 all reduce to "101" even though they're unrelated subjects
// (not a Theory/Lab pair). Whenever that happens, the ORIGINAL prefixed
// code is shown instead of the bare digits, with Lab rows tagged "(Lab)" -
// this rule applies to any semester where such a collision arises.
export const COURSES_BY_KEY: Record<string, Course[]> = {};

(function buildCourseIndex() {
  const bySemester: Record<number, Course[]> = {};
  RAW_COURSES.forEach((c) => {
    (bySemester[c.semester] = bySemester[c.semester] || []).push(c);
  });

  Object.keys(bySemester).forEach((semKey) => {
    const list = bySemester[Number(semKey)];
    const groups: Record<string, Course[]> = {};
    list.forEach((c) => {
      const digits = c.code.replace(/\D/g, '');
      (groups[digits] = groups[digits] || []).push(c);
    });
    list.forEach((c, idx) => {
      const digits = c.code.replace(/\D/g, '');
      const group = groups[digits];
      const base = stripLabSuffix(c.code);
      const distinctBases = Array.from(
        new Set(group.map((g) => stripLabSuffix(g.code).toUpperCase()))
      );
      const collision = distinctBases.length > 1;
      const lab = isLabCode(c.code);
      c._id = c.semester + '|' + c.code + '|' + idx;
      c._isLab = lab;
      c._codeDigitsValue = parseInt(digits, 10) || 0;
      c._codeDisplay = collision
        ? lab ? base + ' (Lab)' : base
        : lab ? digits + ' (Lab)' : digits;
    });
  });

  RAW_COURSES.forEach((c) => {
    const key = 'Pharm.D|' + c.semester;
    (COURSES_BY_KEY[key] = COURSES_BY_KEY[key] || []).push(c);
  });
})();

export function getCoursesFor(program: string, semester: number | string): Course[] | null {
  return COURSES_BY_KEY[program + '|' + semester] || null;
}

export function sortedByShortName(courses: Course[]): Course[] {
  return courses.slice().sort((a, b) => a.shortName.localeCompare(b.shortName));
}

export function sortedByCode(courses: Course[]): Course[] {
  return courses.slice().sort((a, b) => {
    if (a._codeDigitsValue !== b._codeDigitsValue) {
      return (a._codeDigitsValue ?? 0) - (b._codeDigitsValue ?? 0);
    }
    return (a._codeDisplay ?? '').localeCompare(b._codeDisplay ?? '');
  });
}

export function defaultCourseFor(program: string, semester: number | string): Course | null {
  const list = getCoursesFor(program, semester);
  return list ? sortedByShortName(list)[0] : null;
}
```

## File: tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}

```

