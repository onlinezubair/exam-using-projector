# Milestone 7 Discovery Dump 2 — 2026-09-06 16:00:29
# Project root: D:\Exam taking and OMR sheet design\Projector base exam\mcq-projector

## components\ExamApp.tsx
```tsx
'use client';

import { useExamStore } from '@/store/examStore';
import { MetaScreen } from '@/components/screens/MetaScreen/MetaScreen';
import { SetupScreen } from '@/components/screens/SetupScreen/SetupScreen';
import { SlideshowScreen } from '@/components/screens/SlideshowScreen/SlideshowScreen';

// Screen state machine — screens are in-memory state, not routes, matching
// the original single-page feel (plan Section 16, Open Decision 3).
export function ExamApp() {
  const screen = useExamStore((s) => s.screen);

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

## app\page.tsx
```tsx
import { ExamApp } from '@/components/ExamApp';

export default function Home() {
  return <ExamApp />;
}
```

## app\layout.tsx
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

## lib\meta.ts
```tsx
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

## types\index.ts
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

