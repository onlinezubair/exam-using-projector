# MCQ Projector — Full Source Dump (auto-generated)
Generated: 2026-09-06 18:56:44

## Directory Tree
```
app/
    favicon.ico
    globals.css
    layout.tsx
    page.module.css
    page.tsx
    theme.css
components/
    screens/
        EndScreen/
            EndScreen.module.css
            EndScreen.tsx
        MetaScreen/
            MetaScreen.module.css
            MetaScreen.test.tsx
            MetaScreen.tsx
        SetupScreen/
            SetupScreen.module.css
            SetupScreen.test.tsx
            SetupScreen.tsx
        SlideshowScreen/
            Bottombar.tsx
            CalibrationBar.tsx
            SlideArea.tsx
            SlideshowScreen.module.css
            SlideshowScreen.test.tsx
            SlideshowScreen.tsx
            Topbar.tsx
    subject-lookup/
        SubjectBrowse.tsx
        SubjectLookup.module.css
        SubjectSearch.tsx
    ExamApp.tsx
    PrintArea.tsx
    ResumeBanner.tsx
hooks/
    useBeforeUnloadGuard.test.tsx
    useBeforeUnloadGuard.ts
    useFullscreen.test.tsx
    useFullscreen.ts
    useKeyboardShortcuts.test.tsx
    useKeyboardShortcuts.ts
    usePrintBackup.ts
lib/
    aiPrompt.ts
    courses.test.ts
    courses.ts
    demoQuestions.ts
    meta.test.ts
    meta.ts
    parser.test.ts
    parser.ts
    shuffle.test.ts
    shuffle.ts
    storage.ts
    time.ts
    zip.test.ts
    zip.ts
public/
    file.svg
    globe.svg
    next.svg
    vercel.svg
    window.svg
store/
    examStore.ts
    persistence.test.ts
    persistence.ts
types/
    index.ts
.gitignore
AGENTS.md
automation-log.md
CLAUDE.md
discovery-milestone7-part2.md
discovery-milestone7.md
discovery-milestone8-endscreen-part2.md
discovery-milestone8-endscreen-part3.md
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

## Files (66 total)

### `AGENTS.md`
```md
<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
```

### `app\globals.css`
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

@media print {
  body * { visibility: hidden; }
  #printArea, #printArea * { visibility: visible; }
  #printArea {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background: #fff;
    color: #000;
    padding: 20px;
  }
  .printSet { page-break-after: always; }
  .printSet:last-child { page-break-after: auto; }
  .printQ { margin-bottom: 16px; page-break-inside: avoid; }
  .printOpt { margin-left: 20px; }
}
```

### `app\layout.tsx`
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

### `app\page.module.css`
```css
.page {
  --background: #fafafa;
  --foreground: #fff;

  --text-primary: #000;
  --text-secondary: #666;

  --button-primary-hover: #383838;
  --button-secondary-hover: #f2f2f2;
  --button-secondary-border: #ebebeb;

  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: var(--font-geist-sans);
  background-color: var(--background);
}

.main {
  display: flex;
  flex: 1;
  width: 100%;
  max-width: 800px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: var(--foreground);
  padding: 120px 60px;
}

.intro {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 24px;
}

.intro h1 {
  max-width: 320px;
  font-size: 40px;
  font-weight: 600;
  line-height: 48px;
  letter-spacing: -2.4px;
  text-wrap: balance;
  color: var(--text-primary);
}

.intro p {
  max-width: 440px;
  font-size: 18px;
  line-height: 32px;
  text-wrap: balance;
  color: var(--text-secondary);
}

.intro a {
  font-weight: 500;
  color: var(--text-primary);
}

.ctas {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 440px;
  gap: 16px;
  font-size: 14px;
}

.ctas a {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  border-radius: 128px;
  border: 1px solid transparent;
  transition: 0.2s;
  cursor: pointer;
  width: fit-content;
  font-weight: 500;
}

a.primary {
  background: var(--text-primary);
  color: var(--background);
  gap: 8px;
}

a.secondary {
  border-color: var(--button-secondary-border);
}

/* Enable hover only on non-touch devices */
@media (hover: hover) and (pointer: fine) {
  a.primary:hover {
    background: var(--button-primary-hover);
    border-color: transparent;
  }

  a.secondary:hover {
    background: var(--button-secondary-hover);
    border-color: transparent;
  }
}

@media (max-width: 600px) {
  .main {
    padding: 48px 24px;
  }

  .intro {
    gap: 16px;
  }

  .intro h1 {
    font-size: 32px;
    line-height: 40px;
    letter-spacing: -1.92px;
  }
}

@media (prefers-color-scheme: dark) {
  .logo {
    filter: invert();
  }

  .page {
    --background: #000;
    --foreground: #000;

    --text-primary: #ededed;
    --text-secondary: #999;

    --button-primary-hover: #ccc;
    --button-secondary-hover: #1a1a1a;
    --button-secondary-border: #1a1a1a;
  }
}

.code {
  font-family: var(--font-geist-mono);
  font-size: 0.9em;
  background: color-mix(in srgb, currentColor 8%, transparent);
  padding: 0.1em 0.4em;
  border-radius: 6px;
}
```

### `app\page.tsx`
```tsx
import { ExamApp } from '@/components/ExamApp';

export default function Home() {
  return <ExamApp />;
}
```

### `app\theme.css`
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

### `automation-log.md`
```md
- **Timestamp:** 2026-09-06 13:30:22
- **Step:** 1-Scaffold
- **Result:** Success
- **Summary:** mcq-projector/ (Next.js scaffold); package.json (added zustand); app/theme.css; app/layout.tsx (font + theme wired in); app/globals.css (base theme rule); next.config.ts (output: 'export')
- **Warnings/Errors:** None

- **Timestamp:** 2026-09-06 13:38:55
- **Step:** 2-Types-and-lib-ports
- **Result:** Partial
- **Summary:** package.json (test script -> vitest run); vitest.config.ts; lib/parser.ts; lib/shuffle.ts; lib/courses.ts; lib/meta.ts; lib/parser.test.ts; lib/shuffle.test.ts; lib/courses.test.ts; lib/meta.test.ts
- **Warnings/Errors:** None | Tests: FAILED (see terminal output above)

- **Timestamp:** 2026-09-06 14:02:16
- **Step:** 2-Fix-vitest-conflict
- **Result:** Success
- **Summary:** @types/node bumped to ^24.0.0; clean install; vitest installed; Passed: 27, Failed: 0
- **Warnings/Errors:** None


- **Timestamp:** 2026-09-06 14:18:40
- **Step:** 3b-Fix-type-mismatch
- **Result:** Success
- **Summary:** types/index.ts (Course re-exported from lib/courses.ts instead of redeclared); MetaScreen.test.tsx (jest-dom/vitest subpath import)
- **Warnings/Errors:** None

- **Timestamp:** 2026-09-06 14:23:22
- **Step:** 4-Setup-screen
- **Result:** Success
- **Summary:** types/index.ts (+DEFAULT_CONFIG); store/examStore.ts (+config/rawInput/pendingQuestions); lib/demoQuestions.ts; lib/aiPrompt.ts; components/ResumeBanner.tsx (stub); components/screens/SetupScreen/{SetupScreen.tsx,SetupScreen.module.css,SetupScreen.test.tsx}; components/ExamApp.tsx (wired SetupScreen + show hand-off)
- **Warnings/Errors:** None

- **Timestamp:** 2026-09-06 14:34:26
- **Step:** 5a-Discovery-for-Slideshow-Calibration
- **Result:** Success
- **Summary:** Read-only dump of types/index.ts, store/examStore.ts, components/ExamApp.tsx, SetupScreen.tsx, lib/demoQuestions.ts, lib/shuffle.ts for Milestone 5 planning. No files modified.
- **Warnings/Errors:** None

- **Timestamp:** 2026-09-06 14:37:58
- **Step:** 5-Slideshow-Calibration
- **Result:** Success
- **Summary:** store/examStore.ts extended (calibration/slideshow state + actions); ExamApp.tsx wired to real SlideshowScreen; components/screens/SlideshowScreen/{SlideshowScreen,Topbar,CalibrationBar,SlideArea,Bottombar}.tsx + module.css + test.tsx created
- **Warnings/Errors:** None

- **Timestamp:** 2026-09-06 14:42:45
- **Step:** 6a-Discovery-for-Real-Exam-Timer
- **Result:** Success
- **Summary:** Read-only dump of store/examStore.ts, types/index.ts, lib/meta.ts, components/screens/SlideshowScreen/*.tsx, ExamApp.tsx for Milestone 6a (real exam timer) planning. No files modified.
- **Warnings/Errors:** None

- **Timestamp:** 2026-09-06 14:49:35
- **Step:** 6a-Real-Exam-Timer
- **Result:** Success
- **Summary:** lib/time.ts (new); store/examStore.ts (+real-exam timer state/actions: paused/slideDuration/timeLeft/totalElapsed/totalDuration/timerId, beginRealExam/tick/startTimer/stopTimer/togglePause, goNextSlide+goPrevSlide+adjustPerSlide extended for real-exam mode); components/screens/SlideshowScreen/{SlideshowScreen,Topbar,CalibrationBar,Bottombar}.tsx (wired to real timer/pause/Start Exam); SlideshowScreen.test.tsx (+6 real-exam timer tests using vi.useFakeTimers)
- **Warnings/Errors:** Type-check: PASS | Tests: PASS


- **Timestamp:** 2026-09-06 15:08:15
- **Step:** 6b-Discovery-for-Keyboard-Fullscreen
- **Result:** Success
- **Summary:** Read-only dump of store/examStore.ts, types/index.ts, components/ExamApp.tsx, all SlideshowScreen/*.tsx, lib/time.ts, and hooks/ directory listing for Milestone 6b (keyboard shortcuts + fullscreen + beforeunload) planning. No files modified.
- **Warnings/Errors:** None

- **Timestamp:** 2026-09-06 15:18:10
- **Step:** 6b-Keyboard-Fullscreen-Beforeunload
- **Result:** Success
- **Summary:** store/examStore.ts (+endExamToSetup); hooks/{useFullscreen,useKeyboardShortcuts,useBeforeUnloadGuard}.ts + .test.tsx (new); components/screens/SlideshowScreen/{SlideshowScreen,Bottombar}.tsx wired to the new hooks and store action. Modified: store\examStore.ts, components\screens\SlideshowScreen\SlideshowScreen.tsx, components\screens\SlideshowScreen\Bottombar.tsx. Created: None (already existed).
- **Warnings/Errors:** Type-check: PASS | Tests: PASS

- **Timestamp:** 2026-09-06 15:22:12
- **Step:** Handoff-Document
- **Result:** Success
- **Summary:** HANDOFF.md created/updated at project root -- full context-restoration doc covering project overview, tech stack, established conventions, milestone status (1 through 6b done, 7 next), current examStore.ts state/action list, file tree, confirmed deviations from the plan doc, open TODOs, testing status, and Milestone 7 next-step guidance.
- **Warnings/Errors:** None
- **Timestamp:** 2026-09-06 15:24:25
- **Step:** 7a-Discovery-for-Persistence
- **Result:** Success
- **Summary:** Read-only dump of components\screens\SetupScreen\SetupScreen.tsx; components\screens\MetaScreen\MetaScreen.tsx; components\ResumeBanner.tsx; store\examStore.ts; types\index.ts for Milestone 7 (persistence: autosave, last-settings, resume banner) planning. No files modified.
- **Warnings/Errors:** None
- **Timestamp:** 2026-09-06 15:27:09
- **Step:** 7a2-Verify-Persistence-Prereqs
- **Result:** Success
- **Summary:** Checked for store/persistence.ts, lib/storage.ts, subject-lookup components (MetaScreen.tsx already imports these). Found: store\persistence.ts; components\subject-lookup\SubjectBrowse.tsx; components\subject-lookup\SubjectSearch.tsx; components\subject-lookup\SubjectLookup.module.css. Missing: lib\storage.ts. Ran real type-check and test suite to confirm current repo health vs. automation-log claims.
- **Warnings/Errors:** Type-check: PASS | Tests: PASS
- **Timestamp:** 2026-09-06 15:30:42
- **Step:** 7a3-Discovery-for-ExamApp-and-BeforeUnload
- **Result:** Success
- **Summary:** Read-only dump of components\ExamApp.tsx; hooks\useBeforeUnloadGuard.ts; hooks\useBeforeUnloadGuard.test.tsx for Milestone 7 (persistence) planning -- needed to safely add a hydration gate before first render and wire saveAutosave() into the beforeunload guard. No files modified.
- **Warnings/Errors:** None
- **Timestamp:** 2026-09-06 15:42:00
- **Step:** 7b-Discovery-for-Persistence-Drift
- **Result:** Success
- **Summary:** Read-only dump of components\ExamApp.tsx, hooks\useBeforeUnloadGuard.ts, store\examStore.ts -- files that aborted during Milestone 7 due to content drift. No files modified.
- **Warnings/Errors:** None
- **Timestamp:** 2026-09-06 15:43:37
- **Step:** 7c-Discovery-for-Persistence-API
- **Result:** Success
- **Summary:** Read-only dump of store\persistence.ts, components\ResumeBanner.tsx, store\persistence.test.ts -- needed to confirm exact exported API before re-applying the 3 drifted edits (ExamApp.tsx, useBeforeUnloadGuard.ts, examStore.ts). No files modified.
- **Warnings/Errors:** None
- **Timestamp:** 2026-09-06 15:46:36
- **Step:** 7d-Discovery-for-Persistence-Types
- **Result:** Success
- **Summary:** Read-only dump of types\index.ts, lib\meta.ts, MetaScreen.tsx, SetupScreen.tsx (+ lib\storage.ts if present: False) -- discovered that store\persistence.ts and components\ResumeBanner.tsx from the prior Milestone-7 summary are still Milestone-3 stubs (no real logic ever landed), and store\persistence.test.ts does not exist despite being listed as Applied. This pass gathers exact current types before writing the real implementation. No files modified.
- **Warnings/Errors:** None
- **Timestamp:** 2026-09-06 15:50:29
- **Step:** Handoff-Document-Update
- **Result:** Success
- **Summary:** HANDOFF.md regenerated at project root -- documents the confirmed Milestone 7 false-positive (persistence.ts/ResumeBanner.tsx still Milestone-3 stubs, persistence.test.ts missing despite being logged as Applied), the full autosave/last-settings spec pulled from mcq-projector_v8.html source (keys, payload shapes, trigger sites, clear sites, resume banner logic, load ordering), the plan doc's deliberate two-commit-point divergence for last-settings, and a concrete Milestone 7 implementation checklist. New convention added to Section 4: verify Applied claims via fresh discovery before trusting them.
- **Warnings/Errors:** None
## Discovery Pass — Milestone 7 pre-implementation — 2026-09-06 15:55:08
- Files found and dumped: 8
- Files/checks flagged missing or absent-as-expected: 0
- Found: components\screens\MetaScreen\MetaScreen.tsx (242 lines); components\screens\SetupScreen\SetupScreen.tsx (284 lines); components\screens\SlideshowScreen\SlideshowScreen.tsx (61 lines); components\screens\SlideshowScreen\Bottombar.tsx (48 lines); components\ResumeBanner.tsx (14 lines); hooks\useBeforeUnloadGuard.ts (20 lines); store\examStore.ts (339 lines); store\persistence.ts (20 lines)
- Missing/Absent: storage.ts -> confirmed absent (expected); persistence.test.ts -> confirmed absent (expected)

## Discovery Pass — Milestone 7 pre-implementation — 2026-09-06 15:57:31
- Files found and dumped: 8
- Output file: discovery-milestone7.md
- Found: components\screens\MetaScreen\MetaScreen.tsx (242 lines); components\screens\SetupScreen\SetupScreen.tsx (284 lines); components\screens\SlideshowScreen\SlideshowScreen.tsx (61 lines); components\screens\SlideshowScreen\Bottombar.tsx (48 lines); components\ResumeBanner.tsx (14 lines); hooks\useBeforeUnloadGuard.ts (20 lines); store\examStore.ts (339 lines); store\persistence.ts (20 lines)
- Missing/Absent: storage.ts -> confirmed absent (expected); persistence.test.ts -> confirmed absent (expected)

## Discovery Pass 2 — Milestone 7 pre-implementation (ExamApp/types) — 2026-09-06 16:00:37
- Files found and dumped: 5
- Output file: discovery-milestone7-part2.md
- Found: components\ExamApp.tsx (24 lines); app\page.tsx (5 lines); app\layout.tsx (27 lines); lib\meta.ts (98 lines); types\index.ts (92 lines)

## Milestone 7 — Persistence implementation — 2026-09-06 16:09:49
- Steps applied: 2 — lib/storage.ts (created); store/persistence.test.ts (created)
- Steps failed/aborted: 17 — store/persistence.ts — content drift, refused to overwrite; components/ResumeBanner.tsx — content drift, refused to overwrite; examStore imports (store\examStore.ts) — anchor not found; examStore interface: resumeData field (store\examStore.ts) — anchor not found; examStore interface: resume actions (store\examStore.ts) — anchor not found; examStore state: resumeData default (store\examStore.ts) — anchor not found; examStore tick(): autosave triggers (store\examStore.ts) — anchor not found; examStore adjustFont(): autosave trigger (store\examStore.ts) — anchor not found; examStore adjustPerSlide(): calibrating-branch autosave (store\examStore.ts) — anchor not found; examStore adjustPerSlide(): mid-exam-branch autosave (store\examStore.ts) — anchor not found; examStore goNextSlide(): clear autosave at End screen (store\examStore.ts) — anchor not found; examStore endExamToSetup() + new resume actions (store\examStore.ts) — anchor not found; components/ExamApp.tsx — content drift, refused to overwrite; hooks/useBeforeUnloadGuard.ts — content drift, refused to overwrite; SetupScreen imports (components\screens\SetupScreen\SetupScreen.tsx) — anchor not found; SetupScreen: debounced autosave effect (components\screens\SetupScreen\SetupScreen.tsx) — anchor not found; SetupScreen handleBuild(): autosave + last-settings commit (components\screens\SetupScreen\SetupScreen.tsx) — anchor not found
- Type-check: PASS
- Tests: PASS
- Overall: INCOMPLETE — see failures above, needs a follow-up fix script

## Milestone 7 — Persistence implementation — 2026-09-06 16:16:46
- Steps applied: 19 — lib/storage.ts (already present, matched); store/persistence.ts (rewritten); components/ResumeBanner.tsx (rewritten); examStore imports (store\examStore.ts); examStore interface: resumeData field (store\examStore.ts); examStore interface: resume actions (store\examStore.ts); examStore state: resumeData default (store\examStore.ts); examStore tick(): autosave triggers (store\examStore.ts); examStore adjustFont(): autosave trigger (store\examStore.ts); examStore adjustPerSlide(): calibrating-branch autosave (store\examStore.ts); examStore adjustPerSlide(): mid-exam-branch autosave (store\examStore.ts); examStore goNextSlide(): clear autosave at End screen (store\examStore.ts); examStore endExamToSetup() + new resume actions (store\examStore.ts); components/ExamApp.tsx (rewritten); hooks/useBeforeUnloadGuard.ts (rewritten); SetupScreen imports (components\screens\SetupScreen\SetupScreen.tsx); SetupScreen: debounced autosave effect (components\screens\SetupScreen\SetupScreen.tsx); SetupScreen handleBuild(): autosave + last-settings commit (components\screens\SetupScreen\SetupScreen.tsx); store/persistence.test.ts (created)
- Steps failed/aborted: 0 — 
- Type-check: PASS
- Tests: PASS
- Overall: REAL SUCCESS — verified by this script, not just claimed

## 2026-09-06 16:24:35 - Milestone 8 Discovery
Result: Success
Summary: Read-only discovery dump written to discovery-milestone8-endscreen.md (16 target files + 4 directory listings captured).
Warnings/Errors: None
## 2026-09-06 16:29:33 - Milestone 8 Discovery Part 2
Result: Success
Summary: Follow-up read-only discovery dump written to discovery-milestone8-endscreen-part2.md (root listing + types/storage/parser/courses/tsconfig).
Warnings/Errors: None
## 2026-09-06 16:32:36 - Milestone 8 Discovery Part 3
Result: Success
Summary: Follow-up read-only discovery dump written to discovery-milestone8-endscreen-part3.md (hooks dir + SlideshowScreen tree + SetupScreen).
Warnings/Errors: NoneTimestamp: 2026-09-06 17:01:39
Step: 8-EndScreen-Export-Print
Result: Failed
Summary: Script threw an exception.
Warnings/Errors: Method invocation failed because [System.Management.Automation.PSCustomObject] does not contain a method named 'ContainsKey'.
Timestamp: 2026-09-06 17:04:27
Step: 8-EndScreen-Export-Print
Result: Partial
Summary: Implementation attempted but verification failed.
Warnings/Errors: Type-check or Tests FAILED. Check terminal output above.
Timestamp: 2026-09-06 17:22:46
Step: Handoff-Document-Update-M8
Result: Success
Summary: HANDOFF.md regenerated at project root -- marks Milestone 8 as Done, updates file tree, resolves PrintArea hoisting decision, updates vitest config glob, sets Milestone 9 (Manual QA) as next.
Warnings/Errors: None
```

### `CLAUDE.md`
```md
@AGENTS.md
```

### `components\ExamApp.tsx`
```tsx
'use client';
import { useExamStore } from '@/store/examStore';
import { ResumeBanner } from './ResumeBanner';
import { PrintArea } from './PrintArea';
import { EndScreen } from './screens/EndScreen/EndScreen';
import { MetaScreen } from './screens/MetaScreen/MetaScreen';
import { SetupScreen } from './screens/SetupScreen/SetupScreen';
import { SlideshowScreen } from './screens/SlideshowScreen/SlideshowScreen';

export function ExamApp() {
  const screen = useExamStore((s) => s.screen);

  let screenSwitch;
  switch (screen) {
    case 'meta':
      screenSwitch = <MetaScreen />;
      break;
    case 'setup':
      screenSwitch = (
        <>
          <SetupScreen />
          <ResumeBanner />
        </>
      );
      break;
    case 'show':
      screenSwitch = <SlideshowScreen />;
      break;
    case 'end':
      screenSwitch = <EndScreen />;
      break;
    default:
      screenSwitch = <div>Unknown screen</div>;
  }

  return (
    <>
      {screenSwitch}
      <PrintArea />
    </>
  );
}
```

### `components\PrintArea.tsx`
```tsx
'use client';

export function PrintArea() {
  return <div id="printArea" className="print-area-hidden" />;
}
```

### `components\ResumeBanner.tsx`
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

### `components\screens\EndScreen\EndScreen.module.css`
```css
.container {
  text-align: center;
  padding: 40px 20px;
  color: var(--chalk);
}
.actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  margin: 30px 0;
}
.btnPrimary {
  background: var(--accent);
  color: var(--board);
  border: none;
  padding: 12px 24px;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  min-width: 300px;
}
.btnPrimary:hover { filter: brightness(1.1); }
.btnSecondary {
  background: transparent;
  color: var(--chalk);
  border: 2px solid var(--chalk);
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
}
.btnSecondary:hover { background: rgba(255,255,255,0.1); }
.backWrapper { margin-top: 40px; }
.keyArea { margin-top: 30px; text-align: left; max-width: 800px; margin-left: auto; margin-right: auto; }
.noKey { color: var(--danger); font-weight: bold; text-align: center; }
.keyTable { width: 100%; border-collapse: collapse; margin-top: 10px; }
.keyTable th, .keyTable td { border: 1px solid var(--chalk); padding: 8px; text-align: center; }
.keyTable th { background: rgba(255,255,255,0.1); }
```

### `components\screens\EndScreen\EndScreen.tsx`
```tsx
'use client';
import { useState } from 'react';
import { useExamStore } from '@/store/examStore';
import { usePrintBackup } from '@/hooks/usePrintBackup';
import { buildExportZip } from '@/lib/zip';
import { buildMetaFileBase } from '@/lib/meta';
import { getSetLabel } from '@/lib/shuffle';
import styles from './EndScreen.module.css';

export function EndScreen() {
  const { sets, masterQuestions, config, meta, endExamToSetup } = useExamStore();
  const [showKey, setShowKey] = useState(false);
  const triggerPrint = usePrintBackup();

  const hasAnswers = masterQuestions.some(q => q.answer);
  const maxQuestions = Math.max(...sets.map(s => s.length), 0);

  const handleExport = () => {
    if (!hasAnswers) {
      if (!confirm("No answer markers were found in the question bank, so the answer-key CSV will have blank answers. Export anyway?")) {
        return;
        }
    }
    const zipData = buildExportZip(sets, masterQuestions, config, meta);
    const blob = new Blob([zipData as unknown as BlobPart], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${buildMetaFileBase(meta)}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.container}>
      <h1>Test complete</h1>
      <p>Please collect answer sheets now.</p>
      
      <div className={styles.actions}>
        <button onClick={() => setShowKey(!showKey)} className={styles.btnPrimary}>
          {showKey ? 'Hide answer key' : 'Show answer key (teacher only)'}
        </button>
        <button onClick={handleExport} className={styles.btnPrimary}>
          Export question papers + answer key (.zip)
        </button>
        <button onClick={triggerPrint} className={styles.btnPrimary}>
          Print question sets
        </button>
      </div>

      {showKey && (
        <div className={styles.keyArea}>
          {!hasAnswers ? (
            <p className={styles.noKey}>No answer markers (e.g., *A or Answer: A) were found in the question bank, so no key was generated.</p>
          ) : (
            <table className={styles.keyTable}>
              <thead>
                <tr>
                  <th>Position</th>
                  {sets.map((_, idx) => <th key={idx}>Set {getSetLabel(idx)} — Bank Q# / Answer</th>)}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: maxQuestions }).map((_, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    {sets.map((set, setIdx) => {
                      const q = set[i];
                      return <td key={setIdx}>{q ? `Q${q.origNumber} → ${q.answer || '—'}` : '—'}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      <div className={styles.backWrapper}>
        <button onClick={endExamToSetup} className={styles.btnSecondary}>
          Back to setup
        </button>
      </div>
    </div>
  );
}
```

### `components\screens\MetaScreen\MetaScreen.module.css`
```css
.screen { display: flex; flex-direction: column; min-height: 100vh; padding: 40px 24px; align-items: center; }
.card { max-width: 760px; margin: 0 auto; width: 100%; }
.title { font-size: 32px; margin: 0 0 6px; letter-spacing: 0.2px; }
.sub { color: var(--chalk-dim); margin: 0 0 28px; font-size: 16px; line-height: 1.5; }
.row { display: flex; gap: 18px; flex-wrap: wrap; }
.field { flex: 1; min-width: 180px; margin-bottom: 22px; }
.field.hidden { display: none; }
.label { display: block; font-size: 15px; font-weight: 700; margin-bottom: 6px; color: var(--accent); }
.help { font-size: 13px; color: var(--chalk-dim); margin-top: 4px; line-height: 1.4; }
.control {
  width: 100%; background: var(--board-dark); border: 1px solid var(--rule);
  color: var(--chalk); border-radius: 8px; padding: 12px 14px;
  font-family: inherit; font-size: 15px;
}
.nav { display: flex; gap: 12px; align-items: center; margin-top: 8px; }
.primaryBtn {
  background: var(--accent); color: #21301f; padding: 14px 26px; font-size: 17px;
  margin-top: 6px; border: none; border-radius: 8px; font-weight: 700;
  cursor: pointer; font-family: inherit;
}
.primaryBtn:hover { background: var(--accent-dim); }
.ghostBtn {
  background: transparent; border: 1px solid var(--rule); color: var(--chalk);
  padding: 10px 16px; font-size: 14px; border-radius: 8px; font-weight: 700;
  cursor: pointer; font-family: inherit;
}
.ghostBtn:hover { border-color: var(--accent); color: var(--accent); }
```

### `components\screens\MetaScreen\MetaScreen.test.tsx`
```tsx
// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MetaScreen } from './MetaScreen';
import { useExamStore } from '@/store/examStore';
import { DEFAULT_META } from '@/types';

function resetStore() {
  useExamStore.setState({ screen: 'meta', meta: { ...DEFAULT_META } });
}

describe('MetaScreen', () => {
  beforeEach(() => {
    resetStore();
    window.localStorage.clear();
  });

  it('renders the known field set with source defaults', () => {
    render(<MetaScreen />);
    expect(screen.getByText('Exam details')).toBeInTheDocument();
    expect(screen.getByLabelText('Program')).toHaveValue('Pharm.D');
    expect(screen.getByLabelText('Semester / Class / Year')).toHaveValue(4);
    expect(screen.getByLabelText('Exam name')).toHaveValue('');
    expect(screen.getByText('Next →')).toBeInTheDocument();
    expect(screen.getByText('Skip →')).toBeInTheDocument();
  });

  it('shows Quiz number only when Exam name is "Class Quiz"', () => {
    render(<MetaScreen />);
    expect(screen.getByLabelText('Quiz number').closest('div')).not.toBeVisible();
    fireEvent.change(screen.getByLabelText('Exam name'), { target: { value: 'Class Quiz' } });
    expect(screen.getByLabelText('Quiz number').closest('div')).toBeVisible();
  });

  it('"Skip →" resets fields to defaults, never writes Last-used settings, advances to setup', () => {
    render(<MetaScreen />);
    fireEvent.change(screen.getByLabelText('Semester / Class / Year'), { target: { value: '9' } });
    fireEvent.click(screen.getByText('Skip →'));
    expect(useExamStore.getState().screen).toBe('setup');
    expect(useExamStore.getState().meta.semester).toBe(4);
    expect(window.localStorage.getItem('mcqProjectorLastSettings_v1')).toBeNull();
  });

  it('"Next →" commits current fields to the store and advances to setup', () => {
    render(<MetaScreen />);
    fireEvent.change(screen.getByLabelText('Semester / Class / Year'), { target: { value: '7' } });
    fireEvent.click(screen.getByText('Next →'));
    expect(useExamStore.getState().screen).toBe('setup');
    expect(useExamStore.getState().meta.semester).toBe(7);
  });
});
```

### `components\screens\MetaScreen\MetaScreen.tsx`
```tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useExamStore } from '@/store/examStore';
import { commitLastSettings } from '@/store/persistence';
import { getCoursesFor, defaultCourseFor } from '@/lib/courses';
import { nowLocalForInput } from '@/lib/meta';
import type { Course, ExamMeta } from '@/types';
import { DEFAULT_META } from '@/types';
import { SubjectBrowse } from '@/components/subject-lookup/SubjectBrowse';
import { SubjectSearch } from '@/components/subject-lookup/SubjectSearch';
import subjStyles from '@/components/subject-lookup/SubjectLookup.module.css';
import styles from './MetaScreen.module.css';

// Exam Metadata screen — source: #meta (mcq-projector_v8.html L337-420),
// wiring in L1032-1056. Behavior-identical port: same fields, same
// Next/Skip semantics (plan Section 2.1). "Next ->" commits to the store
// and (eventually, Milestone 7) Last-used settings; "Skip ->" resets to
// hard-coded defaults and deliberately never touches Last-used settings.
export function MetaScreen() {
  const setScreen = useExamStore((s) => s.setScreen);
  const setMetaInStore = useExamStore((s) => s.setMeta);
  const storedMeta = useExamStore((s) => s.meta);

  const [program, setProgram] = useState(storedMeta.program || 'Pharm.D');
  const [semester, setSemester] = useState<number | ''>(storedMeta.semester || 4);
  const [examName, setExamName] = useState(storedMeta.examName || '');
  const [quizNumber, setQuizNumber] = useState<number | ''>(storedMeta.quizNumber || 1);
  const [date, setDate] = useState(storedMeta.date || '');
  const [dateManuallySet, setDateManuallySet] = useState(storedMeta.dateManuallySet || false);
  const [subjectMode, setSubjectMode] = useState<'browse' | 'search'>(storedMeta.subjectMode || 'browse');
  const [freeTextSubject, setFreeTextSubject] = useState(storedMeta.subject || '');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // One-time "now" default, matching source's single load-time assignment
  // (L1052-1053) rather than a live-updating clock.
  useEffect(() => {
    if (!date) setDate(nowLocalForInput());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const semesterNum = semester === '' ? NaN : Number(semester);
  const courseList = useMemo(
    () => getCoursesFor(program, semesterNum),
    [program, semesterNum]
  );

  // Mirrors source refreshSubjectField(): keep the current course if it
  // still belongs to this semester, else fall back to the semester's
  // default course (L897-923).
  useEffect(() => {
    if (!courseList) {
      setSelectedCourse(null);
      return;
    }
    setSelectedCourse((prev) => {
      if (prev && prev.semester === semesterNum) return prev;
      return defaultCourseFor(program, semesterNum);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseList, program, semesterNum]);

  const showQuizNumber = examName === 'Class Quiz';

  function captureMeta(): ExamMeta {
    const usingCourses = !!courseList;
    return {
      program,
      semester: semester === '' ? '' : Number(semester),
      subject: usingCourses && selectedCourse ? selectedCourse.shortName : freeTextSubject.trim(),
      subjectCode: usingCourses && selectedCourse ? selectedCourse.code : '',
      subjectFullName: usingCourses && selectedCourse ? selectedCourse.fullName : '',
      subjectMode,
      examName,
      quizNumber: examName === 'Class Quiz' ? (quizNumber === '' ? '' : Number(quizNumber)) : '',
      date,
      dateManuallySet,
    };
  }

  function handleNext() {
    const meta = captureMeta();
    setMetaInStore(meta);
    // Source L1039: saveLastSettings() fires only from "Next ->".
    commitLastSettings(meta);
    setScreen('setup');
  }

  function handleSkip() {
    const now = nowLocalForInput();
    setProgram(DEFAULT_META.program);
    setSemester(DEFAULT_META.semester);
    setExamName(DEFAULT_META.examName);
    setQuizNumber(DEFAULT_META.quizNumber);
    setDate(now);
    setDateManuallySet(false);
    setSubjectMode(DEFAULT_META.subjectMode);
    setFreeTextSubject('');
    setSelectedCourse(defaultCourseFor(DEFAULT_META.program, Number(DEFAULT_META.semester)));
    setMetaInStore({ ...DEFAULT_META, date: now });
    // Deliberately NO commitLastSettings() call here — source Section 2.1:
    // "Skip ->" never writes Last-used settings.
    setScreen('setup');
  }

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <h1 className={styles.title}>Exam details</h1>
        <p className={styles.sub}>
          Optional — fill in whatever applies, or skip straight to pasting questions.
          Every field here can be left blank.
        </p>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="metaProgram">Program</label>
            <select
              id="metaProgram"
              className={styles.control}
              value={program}
              onChange={(e) => setProgram(e.target.value)}
            >
              <option value="Pharm.D">Pharm.D</option>
              <option value="FSc">FSc</option>
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="metaSemester">Semester / Class / Year</label>
            <input
              id="metaSemester"
              className={styles.control}
              type="number"
              min={1}
              max={12}
              value={semester}
              onChange={(e) => setSemester(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor={courseList ? undefined : 'metaSubject'}>Subject</label>
            {!courseList ? (
              <>
                <input
                  id="metaSubject"
                  className={styles.control}
                  type="text"
                  list="metaSubjectList"
                  placeholder="e.g. Microbiology"
                  value={freeTextSubject}
                  onChange={(e) => setFreeTextSubject(e.target.value)}
                />
                <datalist id="metaSubjectList" />
                <div className={styles.help}>
                  No course list available yet for this Program/Semester — type the subject.
                </div>
              </>
            ) : (
              <div>
                <div className={subjStyles.subjToggle} role="tablist">
                  <button
                    type="button"
                    className={`${subjStyles.subjToggleBtn} ${subjectMode === 'browse' ? subjStyles.active : ''}`}
                    onClick={() => setSubjectMode('browse')}
                  >
                    Browse
                  </button>
                  <button
                    type="button"
                    className={`${subjStyles.subjToggleBtn} ${subjectMode === 'search' ? subjStyles.active : ''}`}
                    onClick={() => setSubjectMode('search')}
                  >
                    Search
                  </button>
                </div>
                {subjectMode === 'browse' ? (
                  <SubjectBrowse courses={courseList} selected={selectedCourse} onSelect={setSelectedCourse} />
                ) : (
                  <SubjectSearch courses={courseList} onSelect={setSelectedCourse} />
                )}
                <div className={styles.help}>{selectedCourse ? selectedCourse.fullName : ''}</div>
              </div>
            )}
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="metaExamName">Exam name</label>
            <select
              id="metaExamName"
              className={styles.control}
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
            >
              <option value="">— none —</option>
              <option value="Class Quiz">Class Quiz</option>
              <option value="Mid Term">Mid Term</option>
              <option value="Final Term">Final Term</option>
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={`${styles.field} ${showQuizNumber ? '' : styles.hidden}`}>
            <label className={styles.label} htmlFor="metaQuizNum">Quiz number</label>
            <input
              id="metaQuizNum"
              className={styles.control}
              type="number"
              min={1}
              max={15}
              value={quizNumber}
              onChange={(e) => setQuizNumber(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="metaDate">Date</label>
            <input
              id="metaDate"
              className={styles.control}
              type="datetime-local"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setDateManuallySet(true);
              }}
            />
            <div className={styles.help}>
              Defaults to now, and re-syncs to the moment the real exam actually starts. Edit it to override.
            </div>
          </div>
        </div>

        <div className={styles.nav}>
          <button className={styles.primaryBtn} onClick={handleNext}>Next →</button>
          <button className={styles.ghostBtn} onClick={handleSkip}>Skip →</button>
        </div>
      </div>
    </div>
  );
}
```

### `components\screens\SetupScreen\SetupScreen.module.css`
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

### `components\screens\SetupScreen\SetupScreen.test.tsx`
```tsx
// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SetupScreen } from './SetupScreen';
import { useExamStore } from '@/store/examStore';
import { DEFAULT_META, DEFAULT_CONFIG } from '@/types';

function resetStore() {
  useExamStore.setState({
    screen: 'setup',
    meta: { ...DEFAULT_META },
    config: { ...DEFAULT_CONFIG },
    rawInput: '',
    pendingQuestions: [],
    parseWarnings: { skipped: [], invalidAnswers: [] },
  });
}

describe('SetupScreen', () => {
  beforeEach(() => {
    resetStore();
  });

  it('renders the known field set with source defaults', () => {
    render(<SetupScreen />);
    expect(screen.getByLabelText('1. Paste your questions')).toBeInTheDocument();
    expect(screen.getByLabelText('2. Room size')).toHaveValue('medium');
    expect(screen.getByLabelText('3. Questions per screen')).toHaveValue(5);
    expect(screen.getByLabelText('4. Seconds per question')).toHaveValue(40);
    expect(screen.getByLabelText('5. Number of scrambled sets')).toHaveValue('2');
    expect(screen.getByLabelText('6. Marks for correct answer')).toHaveValue(1);
    expect(screen.getByLabelText('7. Marks for incorrect answer')).toHaveValue(0);
  });

  it('shows an error and does not advance when Build is clicked with empty input', () => {
    render(<SetupScreen />);
    fireEvent.click(screen.getByText('Build slideshow →'));
    expect(screen.getByText(/No valid questions found/)).toBeInTheDocument();
    expect(useExamStore.getState().screen).toBe('setup');
  });

  it('"Load a sample" fills the textarea with the 4-question worked example', () => {
    render(<SetupScreen />);
    fireEvent.click(screen.getByText('Load a sample to see the format →'));
    const textarea = screen.getByLabelText('1. Paste your questions') as HTMLTextAreaElement;
    expect(textarea.value).toContain('chemical symbol for water');
  });

  it('changing Number of scrambled sets always overwrites Questions per screen (no override tracking)', () => {
    render(<SetupScreen />);
    fireEvent.change(screen.getByLabelText('3. Questions per screen'), { target: { value: '9' } });
    fireEvent.change(screen.getByLabelText('5. Number of scrambled sets'), { target: { value: '4' } });
    expect(screen.getByLabelText('3. Questions per screen')).toHaveValue(3);
  });

  it('Build slideshow with the sample loaded parses questions and advances to "show"', () => {
    render(<SetupScreen />);
    fireEvent.click(screen.getByText('Load a sample to see the format →'));
    fireEvent.click(screen.getByText('Build slideshow →'));
    expect(useExamStore.getState().screen).toBe('show');
    expect(useExamStore.getState().pendingQuestions.length).toBe(4);
  });
});
```

### `components\screens\SetupScreen\SetupScreen.tsx`
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

### `components\screens\SlideshowScreen\Bottombar.tsx`
```tsx
'use client';

import { useExamStore } from '@/store/examStore';
import { useFullscreen } from '@/hooks/useFullscreen';
import { usePrintBackup } from '@/hooks/usePrintBackup';
import styles from './SlideshowScreen.module.css';

export function Bottombar() {
  const { calibrating, adjustFont, adjustPerSlide, paused, togglePause, goPrevSlide, goNextSlide, endExamToSetup, config } = useExamStore();
  const { toggleFullscreen } = useFullscreen();
  const triggerPrint = usePrintBackup();


  return (
    <div className={styles.bottombar}>
      <button title="Previous screen  (←)" onClick={goPrevSlide}>⟵ Prev</button>
      {!calibrating && (
        <button title="Pause / Resume  (Space) — Space shortcut lands in Milestone 6b" onClick={togglePause}>
          {paused ? 'Resume' : 'Pause'}
        </button>
      )}
      <button title="Next screen  (→)" onClick={goNextSlide}>Next ⟶</button>
      <button onClick={toggleFullscreen} title="Toggle full screen (F)">Full screen</button>
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
      <button onClick={endExamToSetup} title="End exam and return to setup (Esc)">Back to setup</button>
      <span className={styles.hint}>
        Space=pause · ←/→=navigate · +/-=zoom · [ ]=Qs/screen · F=fullscreen · P=print backup · Esc=end
      </span>
    </div>
  );
}
```

### `components\screens\SlideshowScreen\CalibrationBar.tsx`
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

### `components\screens\SlideshowScreen\SlideArea.tsx`
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

### `components\screens\SlideshowScreen\SlideshowScreen.module.css`
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

### `components\screens\SlideshowScreen\SlideshowScreen.test.tsx`
```tsx
// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SlideshowScreen } from './SlideshowScreen';
import { useExamStore } from '@/store/examStore';
import { DEFAULT_CONFIG, DEFAULT_META } from '@/types';
import type { Question } from '@/types';

// Resets the store to a clean pre-calibration state before each test, since
// Zustand state is module-level and persists across tests otherwise. Any
// new milestone's fields on examStore get added here too.
function resetStore() {
  useExamStore.setState({
    meta: { ...DEFAULT_META },
    config: { ...DEFAULT_CONFIG },
    pendingQuestions: [],
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
    screen: 'show',
  });
}

function makeQuestions(count: number): Question[] {
  return Array.from({ length: count }, (_, i) => ({
    number: i + 1,
    text: `Q${i + 1}?`,
    options: [
      { letter: 'A', text: 'opt A' },
      { letter: 'B', text: 'opt B' },
    ],
    answer: 'A',
  }));
}

describe('SlideshowScreen (calibration mode)', () => {
  beforeEach(() => {
    resetStore();
  });

  it('auto-starts calibration on mount with 12 demo questions', () => {
    render(<SlideshowScreen />);
    expect(screen.getByText(/Calibration mode/i)).toBeInTheDocument();
    // DEFAULT_CONFIG.perSlide is 5 -> questions 1..5 shown, not 6.
    expect(screen.getByText(/Sample question 1 —/)).toBeInTheDocument();
    expect(screen.getByText(/Sample question 5 —/)).toBeInTheDocument();
    expect(screen.queryByText(/Sample question 6 —/)).not.toBeInTheDocument();
    expect(screen.getByText('Calibration — screen 1 of 3')).toBeInTheDocument();
  });

  it('builds one set column per numSets when numSets is 1', () => {
    useExamStore.setState({ config: { ...DEFAULT_CONFIG, numSets: 1 } });
    render(<SlideshowScreen />);
    // A single set never shows a "Set X" label (source: numSets > 1 check).
    expect(screen.queryByText(/^Set /)).not.toBeInTheDocument();
  });

  it('shows a "Set A" / "Set B" label when numSets > 1', () => {
    useExamStore.setState({ config: { ...DEFAULT_CONFIG, numSets: 2 } });
    render(<SlideshowScreen />);
    expect(screen.getByText('Set A')).toBeInTheDocument();
    expect(screen.getByText('Set B')).toBeInTheDocument();
  });

  it('Next/Prev navigate between calibration screens and stop at the edges', () => {
    render(<SlideshowScreen />);
    expect(screen.getByText('Calibration — screen 1 of 3')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Next ⟶'));
    expect(screen.getByText('Calibration — screen 2 of 3')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Next ⟶'));
    expect(screen.getByText('Calibration — screen 3 of 3')).toBeInTheDocument();

    // Already on the last calibration screen — stays put (source L1935).
    fireEvent.click(screen.getByText('Next ⟶'));
    expect(screen.getByText('Calibration — screen 3 of 3')).toBeInTheDocument();

    fireEvent.click(screen.getByText('⟵ Prev'));
    expect(screen.getByText('Calibration — screen 2 of 3')).toBeInTheDocument();
  });

  it('adjustPerSlide is clamped to 2-5 and Q+/Q- update the display', () => {
    render(<SlideshowScreen />);
    expect(screen.getByTitle('Questions currently shown per screen')).toHaveTextContent('5/screen');

    // Already at max (5) — Q+ is a no-op.
    fireEvent.click(screen.getByText('Q+'));
    expect(screen.getByTitle('Questions currently shown per screen')).toHaveTextContent('5/screen');

    fireEvent.click(screen.getByText('Q−'));
    expect(screen.getByTitle('Questions currently shown per screen')).toHaveTextContent('4/screen');
  });

  it('adjustFont is clamped 14-60 (questions) / 12-48 (options)', () => {
    render(<SlideshowScreen />);
    // Push font size down repeatedly past its floor.
    for (let i = 0; i < 20; i++) {
      fireEvent.click(screen.getByText('A-'));
    }
    const config = useExamStore.getState().config;
    expect(config.qsize).toBe(14);
    expect(config.optsize).toBe(12);
  });
});

describe('SlideshowScreen (real exam timer — Milestone 6a)', () => {
  beforeEach(() => {
    resetStore();
    vi.useFakeTimers();
  });

  afterEach(() => {
    useExamStore.getState().stopTimer();
    vi.useRealTimers();
  });

  it('"Start Exam →" swaps pendingQuestions in, hides the calib bar, and starts the countdown', () => {
    useExamStore.setState({
      pendingQuestions: makeQuestions(6),
      config: { ...DEFAULT_CONFIG, perSlide: 3, numSets: 1, secsPerQ: 10 },
    });
    render(<SlideshowScreen />);
    expect(screen.getByText(/Calibration mode/i)).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByText('Start Exam →'));
    });

    expect(screen.queryByText(/Calibration mode/i)).not.toBeInTheDocument();
    expect(screen.getByText('Screen 1 of 2')).toBeInTheDocument();
    // 3 questions * 10s each = 30s for the first slide.
    expect(screen.getByText('00:30')).toBeInTheDocument();

    const state = useExamStore.getState();
    expect(state.masterQuestions).toHaveLength(6);
    expect(state.calibrating).toBe(false);
    expect(state.timerId).not.toBeNull();
  });

  it('ticks the countdown down every second and updates the overall total', () => {
    useExamStore.setState({
      pendingQuestions: makeQuestions(1),
      config: { ...DEFAULT_CONFIG, perSlide: 1, numSets: 1, secsPerQ: 5 },
    });
    render(<SlideshowScreen />);
    act(() => {
      fireEvent.click(screen.getByText('Start Exam →'));
    });
    expect(screen.getByText('00:05')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText('00:03')).toBeInTheDocument();
    expect(screen.getByText(/Total: 00:02 \/ 00:05/)).toBeInTheDocument();
  });

  it('pausing stops the countdown; resuming continues it', () => {
    useExamStore.setState({
      pendingQuestions: makeQuestions(3),
      config: { ...DEFAULT_CONFIG, perSlide: 1, numSets: 1, secsPerQ: 20 },
    });
    render(<SlideshowScreen />);
    act(() => {
      fireEvent.click(screen.getByText('Start Exam →'));
    });

    act(() => {
      fireEvent.click(screen.getByText('Pause'));
    });
    expect(screen.getByText('Resume')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    // Paused — no change.
    expect(screen.getByText('00:20')).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByText('Resume'));
    });
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText('00:19')).toBeInTheDocument();
  });

  it('auto-advances to the next slide when a slide\'s countdown reaches zero', () => {
    useExamStore.setState({
      pendingQuestions: makeQuestions(2),
      config: { ...DEFAULT_CONFIG, perSlide: 1, numSets: 1, secsPerQ: 3 },
    });
    render(<SlideshowScreen />);
    act(() => {
      fireEvent.click(screen.getByText('Start Exam →'));
    });
    expect(screen.getByText('Screen 1 of 2')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText('Screen 2 of 2')).toBeInTheDocument();
    expect(screen.getByText('00:03')).toBeInTheDocument();
  });

  it('stops the timer and routes to the end screen after the last slide finishes', () => {
    useExamStore.setState({
      pendingQuestions: makeQuestions(1),
      config: { ...DEFAULT_CONFIG, perSlide: 1, numSets: 1, secsPerQ: 2 },
    });
    render(<SlideshowScreen />);
    act(() => {
      fireEvent.click(screen.getByText('Start Exam →'));
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    const state = useExamStore.getState();
    expect(state.screen).toBe('end');
    expect(state.timerId).toBeNull();
  });
});
```

### `components\screens\SlideshowScreen\SlideshowScreen.tsx`
```tsx
'use client';

import { useEffect } from 'react';
import { useExamStore } from '@/store/examStore';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useBeforeUnloadGuard } from '@/hooks/useBeforeUnloadGuard';
import { usePrintBackup } from '@/hooks/usePrintBackup';
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

### `components\screens\SlideshowScreen\Topbar.tsx`
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

### `components\subject-lookup\SubjectBrowse.tsx`
```tsx
'use client';

import type { Course } from '@/types';
import { sortedByShortName, sortedByCode } from '@/lib/courses';
import styles from './SubjectLookup.module.css';

interface SubjectBrowseProps {
  courses: Course[];
  selected: Course | null;
  onSelect: (course: Course) => void;
}

// Two synced dropdowns (Short Name / Code) over the same course list.
// Mirrors source populateBrowseSelects() + applyCourseSelection()
// (mcq-projector_v8.html L803-832).
export function SubjectBrowse({ courses, selected, onSelect }: SubjectBrowseProps) {
  const byShortName = sortedByShortName(courses);
  const byCode = sortedByCode(courses);

  function handleChange(id: string) {
    const course = courses.find((c) => c._id === id);
    if (course) onSelect(course);
  }

  return (
    <div className={styles.browseRow}>
      <div className={styles.subfieldWide}>
        <label className={styles.sublabel} htmlFor="subjectShortSelect">Course Short Name</label>
        <select
          id="subjectShortSelect"
          className={styles.select}
          value={selected?._id ?? ''}
          onChange={(e) => handleChange(e.target.value)}
        >
          {byShortName.map((c) => (
            <option key={c._id} value={c._id}>{c.shortName}</option>
          ))}
        </select>
      </div>
      <div className={styles.subfield}>
        <label className={styles.sublabel} htmlFor="subjectCodeSelect">Course Code</label>
        <select
          id="subjectCodeSelect"
          className={styles.select}
          value={selected?._id ?? ''}
          onChange={(e) => handleChange(e.target.value)}
        >
          {byCode.map((c) => (
            <option key={c._id} value={c._id}>{c._codeDisplay}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
```

### `components\subject-lookup\SubjectLookup.module.css`
```css
.browseRow { display: flex; gap: 14px; flex-wrap: wrap; }
.subfield { flex: 1; min-width: 160px; }
.subfieldWide { flex: 2.6; min-width: 300px; }
.sublabel {
  display: block; font-size: 12px; font-weight: 700;
  color: var(--chalk-dim); margin-bottom: 5px;
  text-transform: uppercase; letter-spacing: 0.4px;
}
.select {
  width: 100%; background: var(--board-dark); border: 1px solid var(--rule);
  color: var(--chalk); border-radius: 8px; padding: 12px 14px;
  font-family: inherit; font-size: 15px;
}

.searchWrap { position: relative; }
.searchInput {
  width: 100%; background: var(--board-dark); border: 1px solid var(--rule);
  color: var(--chalk); border-radius: 8px; padding: 12px 14px;
  font-family: inherit; font-size: 15px;
}
.searchResults {
  display: none;
  position: absolute; left: 0; right: 0; top: calc(100% + 4px);
  background: var(--board-dark); border: 1px solid var(--rule);
  border-radius: 8px; max-height: 260px; overflow-y: auto; z-index: 20;
}
.searchResults.show { display: block; }
.result { padding: 9px 14px; cursor: pointer; border-bottom: 1px solid var(--rule); }
.result:last-child { border-bottom: none; }
.result:hover { background: rgba(242, 201, 76, 0.14); }
.resultName { font-weight: 700; color: var(--chalk); font-size: 14px; }
.resultMeta { font-size: 12px; color: var(--chalk-dim); margin-top: 2px; }
.noResults { padding: 10px 14px; font-size: 13px; color: var(--chalk-dim); }

.subjToggle { display: flex; gap: 8px; margin-bottom: 10px; }
.subjToggleBtn {
  background: transparent; border: 1px solid var(--rule); color: var(--chalk-dim);
  padding: 6px 14px; font-size: 13px; border-radius: 999px; cursor: pointer;
  font-weight: 700; font-family: inherit;
}
.subjToggleBtn.active { background: var(--accent); border-color: var(--accent); color: #21301f; }
.subjToggleBtn:hover:not(.active) { border-color: var(--accent); color: var(--accent); }
```

### `components\subject-lookup\SubjectSearch.tsx`
```tsx
'use client';

import { useState } from 'react';
import type { Course } from '@/types';
import styles from './SubjectLookup.module.css';

interface SubjectSearchProps {
  courses: Course[];
  onSelect: (course: Course) => void;
}

// Free-text search over the same course list, live-filtered against
// shortName / code / fullName. Matches source renderSearchResults() +
// the input's focus/blur/input handlers exactly (mcq-projector_v8.html
// L834-862, L881-889) — including the 150ms blur delay so a mousedown on
// a result registers before the dropdown closes.
export function SubjectSearch({ courses, onSelect }: SubjectSearchProps) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const q = query.trim().toLowerCase();
  const matches = q
    ? courses.filter(
        (c) =>
          c.shortName.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.fullName.toLowerCase().includes(q)
      )
    : [];

  function handleSelect(course: Course) {
    setQuery(`${course.code} — ${course.shortName}`);
    setShowResults(false);
    onSelect(course);
  }

  return (
    <div className={styles.searchWrap}>
      <input
        id="subjectSearchInput"
        className={styles.searchInput}
        type="text"
        autoComplete="off"
        placeholder="Type Short Name, Code, or Full Name…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowResults(true);
        }}
        onFocus={() => {
          if (query.trim()) setShowResults(true);
        }}
        onBlur={() => {
          setTimeout(() => setShowResults(false), 150);
        }}
      />
      {showResults && (
        <div className={`${styles.searchResults} ${styles.show}`}>
          {matches.length === 0 ? (
            <div className={styles.noResults}>No matching course.</div>
          ) : (
            matches.map((c) => (
              <div
                key={c._id}
                className={styles.result}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(c);
                }}
              >
                <div className={styles.resultName}>{c.shortName}</div>
                <div className={styles.resultMeta}>
                  Semester {c.semester} · {c.code} · {c.fullName}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
```

### `discovery-milestone7-part2.md`
```md
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
```

### `discovery-milestone7.md`
```md
# Milestone 7 Discovery Dump — 2026-09-06 15:57:25
# Project root: D:\Exam taking and OMR sheet design\Projector base exam\mcq-projector

## components\screens\MetaScreen\MetaScreen.tsx
```tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useExamStore } from '@/store/examStore';
import { commitLastSettings } from '@/store/persistence';
import { getCoursesFor, defaultCourseFor } from '@/lib/courses';
import { nowLocalForInput } from '@/lib/meta';
import type { Course, ExamMeta } from '@/types';
import { DEFAULT_META } from '@/types';
import { SubjectBrowse } from '@/components/subject-lookup/SubjectBrowse';
import { SubjectSearch } from '@/components/subject-lookup/SubjectSearch';
import subjStyles from '@/components/subject-lookup/SubjectLookup.module.css';
import styles from './MetaScreen.module.css';

// Exam Metadata screen — source: #meta (mcq-projector_v8.html L337-420),
// wiring in L1032-1056. Behavior-identical port: same fields, same
// Next/Skip semantics (plan Section 2.1). "Next ->" commits to the store
// and (eventually, Milestone 7) Last-used settings; "Skip ->" resets to
// hard-coded defaults and deliberately never touches Last-used settings.
export function MetaScreen() {
  const setScreen = useExamStore((s) => s.setScreen);
  const setMetaInStore = useExamStore((s) => s.setMeta);
  const storedMeta = useExamStore((s) => s.meta);

  const [program, setProgram] = useState(storedMeta.program || 'Pharm.D');
  const [semester, setSemester] = useState<number | ''>(storedMeta.semester || 4);
  const [examName, setExamName] = useState(storedMeta.examName || '');
  const [quizNumber, setQuizNumber] = useState<number | ''>(storedMeta.quizNumber || 1);
  const [date, setDate] = useState(storedMeta.date || '');
  const [dateManuallySet, setDateManuallySet] = useState(storedMeta.dateManuallySet || false);
  const [subjectMode, setSubjectMode] = useState<'browse' | 'search'>(storedMeta.subjectMode || 'browse');
  const [freeTextSubject, setFreeTextSubject] = useState(storedMeta.subject || '');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // One-time "now" default, matching source's single load-time assignment
  // (L1052-1053) rather than a live-updating clock.
  useEffect(() => {
    if (!date) setDate(nowLocalForInput());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const semesterNum = semester === '' ? NaN : Number(semester);
  const courseList = useMemo(
    () => getCoursesFor(program, semesterNum),
    [program, semesterNum]
  );

  // Mirrors source refreshSubjectField(): keep the current course if it
  // still belongs to this semester, else fall back to the semester's
  // default course (L897-923).
  useEffect(() => {
    if (!courseList) {
      setSelectedCourse(null);
      return;
    }
    setSelectedCourse((prev) => {
      if (prev && prev.semester === semesterNum) return prev;
      return defaultCourseFor(program, semesterNum);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseList, program, semesterNum]);

  const showQuizNumber = examName === 'Class Quiz';

  function captureMeta(): ExamMeta {
    const usingCourses = !!courseList;
    return {
      program,
      semester: semester === '' ? '' : Number(semester),
      subject: usingCourses && selectedCourse ? selectedCourse.shortName : freeTextSubject.trim(),
      subjectCode: usingCourses && selectedCourse ? selectedCourse.code : '',
      subjectFullName: usingCourses && selectedCourse ? selectedCourse.fullName : '',
      subjectMode,
      examName,
      quizNumber: examName === 'Class Quiz' ? (quizNumber === '' ? '' : Number(quizNumber)) : '',
      date,
      dateManuallySet,
    };
  }

  function handleNext() {
    const meta = captureMeta();
    setMetaInStore(meta);
    // Source L1039: saveLastSettings() fires only from "Next ->".
    commitLastSettings(meta);
    setScreen('setup');
  }

  function handleSkip() {
    const now = nowLocalForInput();
    setProgram(DEFAULT_META.program);
    setSemester(DEFAULT_META.semester);
    setExamName(DEFAULT_META.examName);
    setQuizNumber(DEFAULT_META.quizNumber);
    setDate(now);
    setDateManuallySet(false);
    setSubjectMode(DEFAULT_META.subjectMode);
    setFreeTextSubject('');
    setSelectedCourse(defaultCourseFor(DEFAULT_META.program, Number(DEFAULT_META.semester)));
    setMetaInStore({ ...DEFAULT_META, date: now });
    // Deliberately NO commitLastSettings() call here — source Section 2.1:
    // "Skip ->" never writes Last-used settings.
    setScreen('setup');
  }

  return (
    <div className={styles.screen}>
      <div className={styles.card}>
        <h1 className={styles.title}>Exam details</h1>
        <p className={styles.sub}>
          Optional — fill in whatever applies, or skip straight to pasting questions.
          Every field here can be left blank.
        </p>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="metaProgram">Program</label>
            <select
              id="metaProgram"
              className={styles.control}
              value={program}
              onChange={(e) => setProgram(e.target.value)}
            >
              <option value="Pharm.D">Pharm.D</option>
              <option value="FSc">FSc</option>
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="metaSemester">Semester / Class / Year</label>
            <input
              id="metaSemester"
              className={styles.control}
              type="number"
              min={1}
              max={12}
              value={semester}
              onChange={(e) => setSemester(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor={courseList ? undefined : 'metaSubject'}>Subject</label>
            {!courseList ? (
              <>
                <input
                  id="metaSubject"
                  className={styles.control}
                  type="text"
                  list="metaSubjectList"
                  placeholder="e.g. Microbiology"
                  value={freeTextSubject}
                  onChange={(e) => setFreeTextSubject(e.target.value)}
                />
                <datalist id="metaSubjectList" />
                <div className={styles.help}>
                  No course list available yet for this Program/Semester — type the subject.
                </div>
              </>
            ) : (
              <div>
                <div className={subjStyles.subjToggle} role="tablist">
                  <button
                    type="button"
                    className={`${subjStyles.subjToggleBtn} ${subjectMode === 'browse' ? subjStyles.active : ''}`}
                    onClick={() => setSubjectMode('browse')}
                  >
                    Browse
                  </button>
                  <button
                    type="button"
                    className={`${subjStyles.subjToggleBtn} ${subjectMode === 'search' ? subjStyles.active : ''}`}
                    onClick={() => setSubjectMode('search')}
                  >
                    Search
                  </button>
                </div>
                {subjectMode === 'browse' ? (
                  <SubjectBrowse courses={courseList} selected={selectedCourse} onSelect={setSelectedCourse} />
                ) : (
                  <SubjectSearch courses={courseList} onSelect={setSelectedCourse} />
                )}
                <div className={styles.help}>{selectedCourse ? selectedCourse.fullName : ''}</div>
              </div>
            )}
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="metaExamName">Exam name</label>
            <select
              id="metaExamName"
              className={styles.control}
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
            >
              <option value="">— none —</option>
              <option value="Class Quiz">Class Quiz</option>
              <option value="Mid Term">Mid Term</option>
              <option value="Final Term">Final Term</option>
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={`${styles.field} ${showQuizNumber ? '' : styles.hidden}`}>
            <label className={styles.label} htmlFor="metaQuizNum">Quiz number</label>
            <input
              id="metaQuizNum"
              className={styles.control}
              type="number"
              min={1}
              max={15}
              value={quizNumber}
              onChange={(e) => setQuizNumber(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="metaDate">Date</label>
            <input
              id="metaDate"
              className={styles.control}
              type="datetime-local"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setDateManuallySet(true);
              }}
            />
            <div className={styles.help}>
              Defaults to now, and re-syncs to the moment the real exam actually starts. Edit it to override.
            </div>
          </div>
        </div>

        <div className={styles.nav}>
          <button className={styles.primaryBtn} onClick={handleNext}>Next →</button>
          <button className={styles.ghostBtn} onClick={handleSkip}>Skip →</button>
        </div>
      </div>
    </div>
  );
}
```

## components\screens\SetupScreen\SetupScreen.tsx
```tsx
'use client';

import { useState } from 'react';
import { useExamStore } from '@/store/examStore';
import { parseQuestions } from '@/lib/parser';
import { PERSLIDE_BY_SETS } from '@/lib/shuffle';
import { SAMPLE_QUESTION_TEXT } from '@/lib/demoQuestions';
import { buildAiPromptText } from '@/lib/aiPrompt';
import { ResumeBanner } from '@/components/ResumeBanner';
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

## components\screens\SlideshowScreen\SlideshowScreen.tsx
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

## components\screens\SlideshowScreen\Bottombar.tsx
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

## components\ResumeBanner.tsx
```tsx
'use client';

// Resume-session banner — source: #resumeBanner, checkAutosave()
// (mcq-projector_v8.html L427-433, L1228-1256). Depends on the autosave
// mechanism, which is Milestone 7's scope. STUB: always renders nothing
// until Milestone 7 wires real crash-recovery detection in. Kept as its
// own component now (per plan file structure) so SetupScreen's markup
// doesn't need to change when Milestone 7 lands.
export function ResumeBanner() {
  // TODO(Milestone 7): read AUTOSAVE_KEY from localStorage; if a valid
  // in-progress session exists, render the "A previous session was found"
  // banner with Resume / Discard actions.
  return null;
}
```

## hooks\useBeforeUnloadGuard.ts
```tsx
'use client';

import { useEffect } from 'react';

// Source: window 'beforeunload' listener (mcq-projector_v8.html
// L1983-1989). Source only arms the guard while
// currentScreenName() === 'show'; here that's achieved by mounting this
// hook only inside SlideshowScreen, which itself only renders while
// screen === 'show' (see ExamApp.tsx).
export function useBeforeUnloadGuard() {
  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      // TODO Milestone 7: saveAutosave() here once persistence exists.
      e.preventDefault();
      e.returnValue = '';
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);
}
```

## store\examStore.ts
```tsx
import { create } from 'zustand';
import type { ExamMeta, Screen, AppConfig, Question } from '@/types';
import { DEFAULT_META, DEFAULT_CONFIG } from '@/types';
import { buildSet, type SetQuestion } from '@/lib/shuffle';
import { buildDemoQuestions } from '@/lib/demoQuestions';
import { nowLocalForInput } from '@/lib/meta';

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
      get().goNextSlide();
      return;
    }
    set({ timeLeft: newTimeLeft, totalElapsed: newTotalElapsed });
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
    // TODO Milestone 7: clearAutosave() once persistence exists.
    set({ screen: 'setup' });
  },
}));
```

## store\persistence.ts
```tsx
import type { ExamMeta } from '@/types';

/**
 * Writes Last-used settings to localStorage — source: saveLastSettings(),
 * key `mcqProjectorLastSettings_v1` (plan Section 2.6 / Section 8).
 * Fires ONLY from the meta screen's "Next ->" action and the setup
 * screen's "Build slideshow ->" action — never from "Skip ->", and never
 * on incidental field edits.
 *
 * STUB for Milestone 3: full localStorage read/write, SSR guards, and the
 * commit-point-only semantics land in Milestone 7 (Persistence). Wired
 * here now so the Meta screen's Next/Skip handlers do not need to change
 * when Milestone 7 lands.
 */
export function commitLastSettings(meta: ExamMeta): void {
  if (typeof window === 'undefined') return;
  // TODO(Milestone 7): persist `meta` (+ config, once Setup exists) under
  // LAST_SETTINGS_KEY = 'mcqProjectorLastSettings_v1'.
  void meta;
}
```
```

### `discovery-milestone8-endscreen-part2.md`
```md
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
```

### `discovery-milestone8-endscreen-part3.md`
```md
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
```

### `discovery-milestone8-endscreen.md`
```md
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
```

### `eslint.config.mjs`
```mjs
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
```

### `HANDOFF.md`
```md
# MCQ Projector — Handoff Document

Rebuild of the single-file `mcq-projector_v8.html` (~2,100-line vanilla HTML/JS
classroom MCQ projector tool) as a typed, componentized Next.js (App Router) +
Zustand + TypeScript application, static-exported (`output: 'export'`) for
local/offline use via `npx serve out`.

## Tech stack
- Next.js 16 (App Router, static export), React 19, TypeScript 5 (strict)
- Zustand 5 for app state (single store: `store/examStore.ts`)
- Vitest + Testing Library + jsdom for tests
- fflate for ZIP generation (answer-key export)
- No CSS framework — CSS Modules per component

## Status: Milestones 1–8 complete, build GREEN. Milestone 9 (Manual QA) next.

| Milestone | Scope | Status |
|---|---|---|
| 1 | Next.js scaffold, Zustand, theme | Done |
| 2 | Types + lib ports (parser, shuffle, courses, meta) | Done |
| 3 | Meta / Setup screens | Done |
| 4 | Setup screen, demo questions, AI prompt helper | Done |
| 5 | Slideshow screen: calibration mode | Done |
| 6a | Real exam timer (countdown, beeps, pause) | Done |
| 6b | Keyboard shortcuts, fullscreen, beforeunload guard | Done |
| 7 | Persistence: autosave, last-used settings, resume banner | Done |
| 8 | EndScreen (answer key + ZIP/CSV export), Print Backup overlay, wired 'P' key | Done — build verified green (`npm run test` + `npm run build`) |
| 9 | Manual QA pass (serve `out`, click through full flow) | **In progress** |

## Confirmed deviations from the plan doc
- `types/index.ts` is the single canonical source for `ExamMeta`, `AppConfig`,
  `Question`, `SetQuestion`, `Course` (re-exported from `lib/courses.ts`),
  `Screen`, `DEFAULT_META`, `DEFAULT_CONFIG`. No other file should ever declare
  its own local `ExamMeta`/`AppConfig` interface — always `import type { ... }
  from '@/types'` (or relative `../types` inside `lib/`). This was the root
  cause of the Milestone 8 build break (a stale local `ExamMeta` shape in a
  test file, not in `lib/meta.ts` itself as originally suspected — confirmed
  by direct file discovery, see "Milestone 8 postmortem" below).
- `ExamMeta.semester` and `ExamMeta.quizNumber` are typed `number | ''`, not
  `string`. Any mock/test data must use numeric literals (or `''`), never
  string numbers like `"4"` or `"3"`.
- `'P'` (print backup) was deliberately left unwired in `useKeyboardShortcuts.ts`
  until Milestone 8, since `usePrintBackup`/`PrintArea` didn't exist before then.
- Escape has no fullscreen-aware double-press behavior — confirmed directly
  against `mcq-projector_v8.html` source, not just the plan doc. It always
  calls `endExamToSetup()` unconditionally.

## Milestone 8 postmortem (for future AI sessions)
A prior session's PowerShell `-replace` regex fixes to TSX files caused a
build break. On fresh discovery, most of the originally-reported issues were
already correctly fixed in the live files (`Bottombar.tsx` imports/destructuring,
`EndScreen.tsx`'s `Blob` cast, `zip.test.ts`'s `origLetter` mock field). The
one real remaining bug was `lib/meta.test.ts` importing `type ExamMeta` from
`./meta` (never exported there) instead of `../types`, plus an incomplete
`emptyMeta()` test helper missing `subjectFullName`/`subjectMode`/
`dateManuallySet`, and two tests passing `quizNumber` as a string. Fixed by
rewriting `lib/meta.test.ts` in full (not patched via regex). **Lesson:
always re-discover actual file content before trusting a prior session's
error report or automation-log summary — they can be stale or already
resolved.**

## Current `store/examStore.ts` — state & actions

**State:** `screen`, `meta`, `config`, `rawInput`, `pendingQuestions`,
`parseWarnings`, `masterQuestions`, `sets`, `calibrating`, `slideIndex`,
`slideCount`, `paused`, `slideDuration`, `timeLeft`, `totalElapsed`,
`totalDuration`, `timerId`, `resumeData`.

**Actions:** `setScreen`, `setMeta`, `setConfig`, `setRawInput`,
`setPendingQuestions`, `startCalibration`, `beginRealExam`, `adjustFont`,
`adjustPerSlide`, `goNextSlide`, `goPrevSlide`, `tick`, `startTimer`,
`stopTimer`, `togglePause`, `endExamToSetup`, `setResumeData`,
`restoreAutosave`, `discardAutosave`.

Autosave (`saveAutosave()`) fires on: `adjustFont`, `adjustPerSlide` (both
branches), and every `tick()`. `clearAutosave()` fires on reaching the End
screen and on `endExamToSetup()`.

## File tree (key paths)
app/ layout.tsx, globals.css, theme.css, page.tsx
components/
ExamApp.tsx top-level screen router
ResumeBanner.tsx
subject-lookup/ SubjectBrowse.tsx, SubjectSearch.tsx, .module.css
screens/
MetaScreen/
SetupScreen/
SlideshowScreen/ SlideshowScreen, Topbar, CalibrationBar, SlideArea, Bottombar (+ .module.css, .test.tsx)
EndScreen/ EndScreen.tsx, EndScreen.module.css
hooks/
useFullscreen.ts
useKeyboardShortcuts.ts
useBeforeUnloadGuard.ts
usePrintBackup.ts
lib/
parser.ts / shuffle.ts / courses.ts / meta.ts / demoQuestions.ts / aiPrompt.ts / time.ts / zip.ts
(+ matching .test.ts for each)
store/
examStore.ts
persistence.ts
types/
index.ts canonical ExamMeta/AppConfig/Question/SetQuestion/Course/Screen + DEFAULTS

## Testing status
- `npm run test` (vitest) — passing
- `npm run build` (`tsc --noEmit` + `next build`) — passing, static export to `.\out`

## Milestone 9 — Manual QA checklist (current step)
Serve `.\out` via `npx serve out` and walk: Meta → Setup (paste bank, build) →
Calibration (zoom, per-slide, fullscreen) → Real exam (timer, pause, nav,
auto-advance) → Print backup ('P' key) → End screen (answer key toggle, ZIP
export, back-to-setup) → mid-exam refresh (resume banner). Report any
deviation with exact reproduction steps for the next fix pass.
```

### `hooks\useBeforeUnloadGuard.test.tsx`
```tsx
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { useBeforeUnloadGuard } from './useBeforeUnloadGuard';

function Harness() {
  useBeforeUnloadGuard();
  return null;
}

function dispatchBeforeUnload(): Event {
  const event = new Event('beforeunload', { cancelable: true });
  window.dispatchEvent(event);
  return event;
}

describe('useBeforeUnloadGuard', () => {
  afterEach(() => cleanup());

  it('prevents default and sets returnValue while mounted', () => {
    render(<Harness />);
    const event = dispatchBeforeUnload() as BeforeUnloadEvent;
    expect(event.defaultPrevented).toBe(true);
    expect(event.returnValue).toBe('');
  });

  it('does nothing after unmount', () => {
    const { unmount } = render(<Harness />);
    unmount();
    const event = dispatchBeforeUnload();
    expect(event.defaultPrevented).toBe(false);
  });
});
```

### `hooks\useBeforeUnloadGuard.ts`
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

### `hooks\useFullscreen.test.tsx`
```tsx
import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFullscreen } from './useFullscreen';

describe('useFullscreen', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(document, 'fullscreenElement', { value: null, configurable: true });
  });

  it('requests fullscreen when not currently fullscreen', () => {
    Object.defineProperty(document, 'fullscreenElement', { value: null, configurable: true });
    const requestFullscreen = vi.fn();
    document.documentElement.requestFullscreen = requestFullscreen;

    const { result } = renderHook(() => useFullscreen());
    act(() => {
      result.current.toggleFullscreen();
    });

    expect(requestFullscreen).toHaveBeenCalledTimes(1);
  });

  it('exits fullscreen when currently fullscreen', () => {
    Object.defineProperty(document, 'fullscreenElement', { value: document.documentElement, configurable: true });
    const exitFullscreen = vi.fn();
    document.exitFullscreen = exitFullscreen;

    const { result } = renderHook(() => useFullscreen());
    act(() => {
      result.current.toggleFullscreen();
    });

    expect(exitFullscreen).toHaveBeenCalledTimes(1);
  });

  it('does not throw when the Fullscreen API is unsupported', () => {
    Object.defineProperty(document, 'fullscreenElement', { value: null, configurable: true });
    delete (document.documentElement as unknown as { requestFullscreen?: unknown }).requestFullscreen;

    const { result } = renderHook(() => useFullscreen());
    expect(() => act(() => result.current.toggleFullscreen())).not.toThrow();
  });
});
```

### `hooks\useFullscreen.ts`
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

### `hooks\useKeyboardShortcuts.test.tsx`
```tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { useExamStore } from '@/store/examStore';
import { useKeyboardShortcuts } from './useKeyboardShortcuts';

function Harness() {
  useKeyboardShortcuts();
  return null;
}

function fireKey(init: KeyboardEventInit) {
  document.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init }));
}

describe('useKeyboardShortcuts', () => {
  const initialState = useExamStore.getState();

  beforeEach(() => {
    useExamStore.setState(initialState, true);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('Space toggles pause unconditionally (matches source: no calibrating guard)', () => {
    render(<Harness />);
    const before = useExamStore.getState().paused;
    fireKey({ code: 'Space' });
    expect(useExamStore.getState().paused).toBe(!before);
  });

  it('ArrowRight/ArrowLeft navigate slides', () => {
    useExamStore.getState().startCalibration();
    render(<Harness />);
    const startIndex = useExamStore.getState().slideIndex;
    fireKey({ code: 'ArrowRight' });
    expect(useExamStore.getState().slideIndex).toBe(startIndex + 1);
    fireKey({ code: 'ArrowLeft' });
    expect(useExamStore.getState().slideIndex).toBe(startIndex);
  });

  it('+/- adjust font size, [ / ] adjust per-slide count', () => {
    useExamStore.getState().startCalibration();
    render(<Harness />);
    const before = useExamStore.getState().config;
    fireKey({ key: '+' });
    expect(useExamStore.getState().config.qsize).toBe(before.qsize + 2);
    fireKey({ key: '-' });
    expect(useExamStore.getState().config.qsize).toBe(before.qsize);
    fireKey({ key: ']' });
    expect(useExamStore.getState().config.perSlide).toBe(before.perSlide + 1);
    fireKey({ key: '[' });
    expect(useExamStore.getState().config.perSlide).toBe(before.perSlide);
  });

  it('F toggles fullscreen', () => {
    Object.defineProperty(document, 'fullscreenElement', { value: null, configurable: true });
    const requestFullscreen = vi.fn();
    document.documentElement.requestFullscreen = requestFullscreen;

    render(<Harness />);
    fireKey({ key: 'f' });
    expect(requestFullscreen).toHaveBeenCalledTimes(1);
  });

  it('Escape confirms then routes to setup and stops the timer', () => {
    window.confirm = vi.fn(() => true);
    useExamStore.setState({ screen: 'show' });

    render(<Harness />);
    fireKey({ key: 'Escape' });

    expect(window.confirm).toHaveBeenCalled();
    expect(useExamStore.getState().screen).toBe('setup');
  });

  it('Escape does nothing if the teacher cancels the confirm dialog', () => {
    window.confirm = vi.fn(() => false);
    useExamStore.setState({ screen: 'show' });

    render(<Harness />);
    fireKey({ key: 'Escape' });

    expect(useExamStore.getState().screen).toBe('show');
  });

  it('removes the listener on unmount', () => {
    const { unmount } = render(<Harness />);
    unmount();
    const before = useExamStore.getState().paused;
    fireKey({ code: 'Space' });
    expect(useExamStore.getState().paused).toBe(before);
  });
});
```

### `hooks\useKeyboardShortcuts.ts`
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

### `hooks\usePrintBackup.ts`
```ts
'use client';
import { useCallback } from 'react';
import { useExamStore } from '@/store/examStore';
import { buildMetaHeaderLine } from '@/lib/meta';
import { getSetLabel } from '@/lib/shuffle';

export function usePrintBackup() {
  const { sets, meta } = useExamStore();
  
  return useCallback(() => {
    if (sets.length === 0) {
      alert("Build the slideshow first.");
      return;
    }
    const printArea = document.getElementById('printArea');
    if (!printArea) return;

    const metaHeader = buildMetaHeaderLine(meta);
    const html = sets.map((set, idx) => {
      const letter = getSetLabel(idx);
      const qs = set.map(q => `
        <div class="printQ">
          <div><strong>${q.displayNumber}.</strong> ${q.text}</div>
          <div class="printOpt">
            ${q.options.map(opt => `<div>${opt.letter}. ${opt.text}</div>`).join('')}
          </div>
        </div>
      `).join('');
      return `<div class="printSet"><h3>Set ${letter}</h3>${qs}</div>`;
    }).join('');

    printArea.innerHTML = metaHeader 
      ? `<div class="printMeta">${metaHeader}</div>${html}` 
      : html;
      
    window.print();
  }, [sets, meta]);
}
```

### `lib\aiPrompt.ts`
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

### `lib\courses.test.ts`
```ts
import { describe, it, expect } from "vitest";
import { getCoursesFor, defaultCourseFor, sortedByCode } from "./courses";

describe("Semester 1 digit-collision rule (GEN-101 / PPD-101 / PID-101)", () => {
  const sem1 = getCoursesFor("Pharm.D", 1)!;

  it("shows the full prefixed code (not bare digits) for the colliding non-lab courses", () => {
    const gen = sem1.find((c) => c.code === "GEN-101")!;
    const ppd = sem1.find((c) => c.code === "PPD-101")!;
    const pid = sem1.find((c) => c.code === "PID-101")!;
    expect(gen._codeDisplay).toBe("GEN-101");
    expect(ppd._codeDisplay).toBe("PPD-101");
    expect(pid._codeDisplay).toBe("PID-101");
  });

  it("tags the colliding lab rows with the base code + (Lab)", () => {
    const ppdLab = sem1.find((c) => c.code === "PPD-101-L")!;
    const pidLab = sem1.find((c) => c.code === "PID-101-L")!;
    expect(ppdLab._codeDisplay).toBe("PPD-101 (Lab)");
    expect(pidLab._codeDisplay).toBe("PID-101 (Lab)");
  });
});

describe("non-colliding Theory/Lab pair (PHARM410 / PHARM410 LAB)", () => {
  const sem3 = getCoursesFor("Pharm.D", 3)!;

  it("shows bare digits for the theory course and digits + (Lab) for its lab", () => {
    const theory = sem3.find((c) => c.code === "PHARM410")!;
    const lab = sem3.find((c) => c.code === "PHARM410 LAB")!;
    expect(theory._codeDisplay).toBe("410");
    expect(lab._codeDisplay).toBe("410 (Lab)");
  });
});

describe("getCoursesFor / defaultCourseFor", () => {
  it("returns null for a program/semester with no structured catalog (e.g. FSc)", () => {
    expect(getCoursesFor("FSc", 1)).toBeNull();
    expect(defaultCourseFor("FSc", 1)).toBeNull();
  });

  it("returns the alphabetically-first course by short name as the default", () => {
    const def = defaultCourseFor("Pharm.D", 1);
    expect(def?.shortName).toBe("Biochemistry-I");
  });
});

describe("sortedByCode", () => {
  it("orders by numeric code digits, ascending", () => {
    const sem5 = getCoursesFor("Pharm.D", 5)!;
    const sorted = sortedByCode(sem5);
    const digitValues = sorted.map((c) => c._codeDigitsValue);
    const expected = [...digitValues].sort((a, b) => (a ?? 0) - (b ?? 0));
    expect(digitValues).toEqual(expected);
  });
});
```

### `lib\courses.ts`
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

### `lib\demoQuestions.ts`
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

### `lib\meta.test.ts`
```ts
import { describe, it, expect } from "vitest";
import { buildMetaHeaderLine, buildMetaFileBase } from "./meta";
import type { ExamMeta } from "../types";

function emptyMeta(): ExamMeta {
  return {
    program: "",
    semester: '',
    subject: "",
    subjectCode: "",
    subjectFullName: "",
    subjectMode: 'browse',
    examName: "",
    quizNumber: '',
    date: "",
    dateManuallySet: false,
  };
}

describe("buildMetaHeaderLine", () => {
  it("returns an empty string when every field is blank", () => {
    expect(buildMetaHeaderLine(emptyMeta())).toBe("");
  });

  it("omits blank fields and joins the rest with em-dashes", () => {
    const meta = { ...emptyMeta(), program: "Pharm.D", semester: 4 };
    expect(buildMetaHeaderLine(meta)).toBe("Pharm.D — Semester 4");
  });

  it("uses 'Code — Short Name' when subjectCode is present", () => {
    const meta = { ...emptyMeta(), subject: "Applied Pharmaceutical Microbiology & Immunology", subjectCode: "PHARM416" };
    expect(buildMetaHeaderLine(meta)).toBe("PHARM416 — Applied Pharmaceutical Microbiology & Immunology");
  });

  it("renders 'Class Quiz N' only for the Class Quiz exam type", () => {
    const meta = { ...emptyMeta(), examName: "Class Quiz", quizNumber: 3 };
    expect(buildMetaHeaderLine(meta)).toBe("Class Quiz 3");
  });

  it("appends the human-readable date last", () => {
    const meta = { ...emptyMeta(), program: "Pharm.D", date: "2026-09-06T10:30" };
    expect(buildMetaHeaderLine(meta)).toBe("Pharm.D — 06 Sep 2026");
  });
});

describe("buildMetaFileBase", () => {
  it("builds the documented pattern from a fully-populated meta", () => {
    const meta: ExamMeta = {
      program: "Pharm.D",
      semester: 4,
      subject: "Applied Pharmaceutical Microbiology & Immunology",
      subjectCode: "PHARM416",
      subjectFullName: "Applied Pharmaceutical Microbiology & Immunology",
      subjectMode: 'browse',
      examName: "Class Quiz",
      quizNumber: 3,
      date: "2026-09-06T10:30",
      dateManuallySet: false,
    };
    expect(buildMetaFileBase(meta)).toBe("PharmD_Sem4_PHARM416_ClassQuiz3_2026-09-06");
  });

  it("falls back to the free-typed subject when there is no subjectCode", () => {
    const meta = { ...emptyMeta(), subject: "Botany Basics" };
    expect(buildMetaFileBase(meta)).toBe("BotanyBasics");
  });

  it("falls back to a generic timestamped name when every field is blank", () => {
    const base = buildMetaFileBase(emptyMeta());
    expect(base).toMatch(/^mcq-exam-\d{4}-\d{2}-\d{2}$/);
  });
});
```

### `lib\meta.ts`
```ts
import type { ExamMeta } from '../types';

// Ported verbatim from mcq-projector_v8.html: pad2, nowLocalForInput,
// formatDateForHeader, formatDateForFilename, buildMetaLabelParts,
// buildMetaHeaderLine, buildMetaFileBase.
//
// Source reads these off a global `state.meta` object; here they take an
// explicit ExamMeta parameter instead (same fields, typed state store -
// see plan §7/§8), so behavior is unchanged but the functions are pure.

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

### `lib\parser.test.ts`
```ts
import { describe, it, expect } from "vitest";
import { parseQuestions } from "./parser";

describe("parseQuestions", () => {
  it("parses a well-formed block with an Answer: line", () => {
    const raw = `What is 2+2?
A) 3
B) 4
C) 5
Answer: B`;
    const { questions, skipped, invalidAnswers } = parseQuestions(raw);
    expect(skipped).toHaveLength(0);
    expect(invalidAnswers).toHaveLength(0);
    expect(questions).toHaveLength(1);
    expect(questions[0].text).toBe("What is 2+2?");
    expect(questions[0].options).toHaveLength(3);
    expect(questions[0].answer).toBe("B");
  });

  it("recognizes the *X shorthand answer form", () => {
    const raw = `Capital of France?
A) Berlin
B) Paris
*B`;
    const { questions } = parseQuestions(raw);
    expect(questions[0].answer).toBe("B");
  });

  it("joins multi-line question text with spaces", () => {
    const raw = `This is a question
that spans two lines.
A) One
B) Two`;
    const { questions } = parseQuestions(raw);
    expect(questions[0].text).toBe("This is a question that spans two lines.");
  });

  it("skips a block with fewer than 2 options and reports a 40-char preview", () => {
    const longText = "A".repeat(60);
    const raw = `${longText}\nA) Only one option`;
    const { questions, skipped } = parseQuestions(raw);
    expect(questions).toHaveLength(0);
    expect(skipped).toHaveLength(1);
    expect(skipped[0]).toContain(longText.slice(0, 40) + "…");
  });

  it("drops and reports an answer letter not among the parsed options", () => {
    const raw = `Question?
A) One
B) Two
Answer: Z`;
    const { questions, invalidAnswers } = parseQuestions(raw);
    expect(questions[0].answer).toBeNull();
    expect(invalidAnswers).toHaveLength(1);
    expect(invalidAnswers[0]).toContain("Q1");
  });

  it("accumulates multiple issues into skipped/invalidAnswers rather than throwing", () => {
    const raw = `Bad block only one option\nA) Solo\n\nGood question\nA) One\nB) Two\nAnswer: Q`;
    const { skipped, invalidAnswers } = parseQuestions(raw);
    expect(skipped).toHaveLength(1);
    expect(invalidAnswers).toHaveLength(1);
  });
});
```

### `lib\parser.ts`
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

### `lib\shuffle.test.ts`
```ts
import { describe, it, expect } from "vitest";
import { shuffle, buildSet, getSetLabel, PERSLIDE_BY_SETS } from "./shuffle";
import type { ParsedQuestion } from "./parser";

function sampleQuestions(): ParsedQuestion[] {
  return [
    { number: 1, text: "Q1", options: [{ letter: "A", text: "1-A" }, { letter: "B", text: "1-B" }], answer: "A" },
    { number: 2, text: "Q2", options: [{ letter: "A", text: "2-A" }, { letter: "B", text: "2-B" }, { letter: "C", text: "2-C" }], answer: "C" },
    { number: 3, text: "Q3", options: [{ letter: "A", text: "3-A" }, { letter: "B", text: "3-B" }], answer: null },
  ];
}

describe("shuffle", () => {
  it("returns a permutation of the input without mutating it", () => {
    const input = [1, 2, 3, 4, 5];
    const copy = [...input];
    const out = shuffle(input);
    expect(input).toEqual(copy); // original untouched
    expect(out.slice().sort()).toEqual(copy.sort());
  });
});

describe("getSetLabel", () => {
  it("uses A-H for the first 8 sets", () => {
    expect(getSetLabel(0)).toBe("A");
    expect(getSetLabel(7)).toBe("H");
  });
  it("falls back to a 1-based number beyond H", () => {
    expect(getSetLabel(8)).toBe("9");
  });
});

describe("PERSLIDE_BY_SETS", () => {
  it("matches the source lookup table for numSets 1-8", () => {
    expect(PERSLIDE_BY_SETS).toEqual({ 1: 6, 2: 5, 3: 4, 4: 3, 5: 3, 6: 2, 7: 2, 8: 2 });
  });
});

describe("buildSet", () => {
  it("renumbers displayNumber sequentially 1..N regardless of shuffle order", () => {
    for (let trial = 0; trial < 20; trial++) {
      const set = buildSet(sampleQuestions());
      expect(set.map((q) => q.displayNumber)).toEqual([1, 2, 3]);
      expect(set.map((q) => q.origNumber).slice().sort()).toEqual([1, 2, 3]);
    }
  });

  it("remaps the answer letter by position, not by option text", () => {
    for (let trial = 0; trial < 50; trial++) {
      const set = buildSet(sampleQuestions());
      set.forEach((q) => {
        const original = sampleQuestions().find((oq) => oq.number === q.origNumber)!;
        if (original.answer === null) {
          expect(q.answer).toBeNull();
          return;
        }
        // The option carrying the ORIGINAL answer letter must be the one
        // whose new letter is reported as the answer, and its text must be
        // unchanged from the original option text at that letter.
        const originalCorrectOpt = original.options.find((o) => o.letter === original.answer)!;
        const newCorrectOpt = q.options.find((o) => o.origLetter === original.answer)!;
        expect(newCorrectOpt.text).toBe(originalCorrectOpt.text);
        expect(q.answer).toBe(newCorrectOpt.letter);
      });
    }
  });

  it("preserves option text/origLetter through the shuffle (no data loss)", () => {
    const set = buildSet(sampleQuestions());
    set.forEach((q) => {
      const original = sampleQuestions().find((oq) => oq.number === q.origNumber)!;
      expect(q.options).toHaveLength(original.options.length);
      const origLetters = q.options.map((o) => o.origLetter).sort();
      expect(origLetters).toEqual(original.options.map((o) => o.letter).sort());
    });
  });
});
```

### `lib\shuffle.ts`
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

### `lib\storage.ts`
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

### `lib\time.ts`
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

### `lib\zip.test.ts`
```ts
import { describe, it, expect } from 'vitest';
import { buildAnswerKeyCSV, buildQuestionPaperHTML } from './zip';
import type { Question, AppConfig, ExamMeta } from '../types';
import type { SetQuestion } from './shuffle';

describe('lib/zip', () => {
  const mockMeta: ExamMeta = { program: 'Pharm.D', semester: 4, subject: 'PHARM', subjectCode: '416', subjectFullName: 'Pharmacology', subjectMode: 'browse', examName: 'Mid Term', quizNumber: 1, date: '2026-09-06', dateManuallySet: false };
  const mockConfig: AppConfig = { roomSize: 'medium', perSlide: 5, secsPerQ: 40, numSets: 2, qsize: 30, optsize: 23, marksCorrect: 1, marksIncorrect: 0 };
  const mockMaster: Question[] = [{ number: 1, text: 'Q1', options: [{ letter: 'A', text: 'Opt A', origLetter: 'A' }], answer: 'A' }];
  const mockSets: SetQuestion[][] = [[{ displayNumber: 1, origNumber: 1, text: 'Q1', options: [{ letter: 'A', text: 'Opt A', origLetter: 'A' }], answer: 'A' }]];

  it('buildAnswerKeyCSV has correct header and comment line', () => {
    const csv = buildAnswerKeyCSV(mockSets, mockMaster, mockConfig, 'Pharm.D, Semester 4');
    expect(csv.split('\n')[0]).toBe('# Pharm.D; Semester 4');
    expect(csv.split('\n')[1]).toBe('Key Letter,Question Number,Response/Mapping,Correct Marks,Incorrect Marks,Tags');
  });

  it('buildAnswerKeyCSV uses displayNumber and includes empty Tags column', () => {
    const csv = buildAnswerKeyCSV(mockSets, mockMaster, mockConfig, 'Test');
    expect(csv).toContain('A,1,"Q1 → A",1,0,');
  });

  it('buildQuestionPaperHTML is self-contained', () => {
    const html = buildQuestionPaperHTML(mockSets[0], 'A', 'Test Header');
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('Question Paper — Set A');
    expect(html).toContain('page-break-inside: avoid');
  });
});
```

### `lib\zip.ts`
```ts
import { zipSync, strToU8 } from 'fflate';
import type { Question, AppConfig, ExamMeta } from '../types';
import type { SetQuestion } from './shuffle';
import { buildMetaFileBase, buildMetaHeaderLine } from './meta';
import { getSetLabel } from './shuffle';

export function buildQuestionPaperHTML(
  setQuestions: SetQuestion[],
  setLetter: string,
  metaHeader: string
): string {
  const questionsHtml = setQuestions.map(q => `
    <div class="q">
      <div class="qline">${q.displayNumber}. ${q.text}</div>
      <div class="opts">
        ${q.options.map(opt => `<div>${opt.letter}. ${opt.text}</div>`).join('')}
      </div>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Question Paper — Set ${setLetter}</title>
<style>
  body { font-family: sans-serif; padding: 20px; color: #000; background: #fff; }
  .q { margin-bottom: 20px; page-break-inside: avoid; }
  .qline { font-weight: bold; margin-bottom: 8px; }
  .opts { margin-left: 20px; }
</style></head><body>
${metaHeader ? `<div style="margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 10px;">${metaHeader}</div>` : ''}
<h2>Question Paper — Set ${setLetter}</h2>
${questionsHtml}
</body></html>`;
}

export function buildAnswerKeyCSV(
  sets: SetQuestion[][],
  masterQuestions: Question[],
  config: AppConfig,
  metaHeader: string
): string {
  const header = "Key Letter,Question Number,Response/Mapping,Correct Marks,Incorrect Marks,Tags";
  const commentHeader = `# ${metaHeader.replace(/,/g, ';')}`;
  let csv = commentHeader + "\n" + header + "\n";

  const maxQuestions = Math.max(...sets.map(s => s.length), 0);
  for (let i = 0; i < maxQuestions; i++) {
    const displayNumber = i + 1;
    sets.forEach((set, setIdx) => {
      const q = set[i];
      const letter = getSetLabel(setIdx);
      const mapping = q ? `Q${q.origNumber} → ${q.answer || '—'}` : '—';
      csv += `${letter},${displayNumber},"${mapping}",${config.marksCorrect},${config.marksIncorrect},\n`;
    });
  }
  return csv;
}

export function buildExportZip(
  sets: SetQuestion[][],
  masterQuestions: Question[],
  config: AppConfig,
  meta: ExamMeta
): Uint8Array {
  const metaHeader = buildMetaHeaderLine(meta);
  const files: Record<string, Uint8Array> = {};

  sets.forEach((set, idx) => {
    const letter = getSetLabel(idx);
    const html = buildQuestionPaperHTML(set, letter, metaHeader);
    files[`QuestionPaper-Set${letter}.html`] = strToU8(html);
  });

  const csv = buildAnswerKeyCSV(sets, masterQuestions, config, metaHeader);
  files['AllAnswerKeys.csv'] = strToU8(csv);

  return zipSync(files);
}
```

### `next.config.ts`
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  /* config options here */
};

export default nextConfig;
```

### `package.json`
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
    "fflate": "^0.8.3",
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

### `README.md`
```md
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
```

### `store\examStore.ts`
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

### `store\persistence.test.ts`
```ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useExamStore } from '@/store/examStore';
import {
  commitLastSettings,
  saveAutosave,
  loadLastSettings,
  checkAutosave,
} from '@/store/persistence';
import { AUTOSAVE_KEY, LAST_SETTINGS_KEY } from '@/lib/storage';
import { DEFAULT_META, DEFAULT_CONFIG } from '@/types';

const INITIAL_STATE = {
  screen: 'meta' as const,
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
};

// Merge (not replace) so the store's action functions are preserved.
function resetAll() {
  window.localStorage.clear();
  useExamStore.setState(INITIAL_STATE);
}

describe('persistence — autosave calibration exclusion', () => {
  beforeEach(resetAll);

  it('never persists real exam fields while calibrating', () => {
    useExamStore.setState({
      calibrating: true,
      rawInput: 'some raw text',
      masterQuestions: [{ number: 1, text: 'Q', options: [], answer: null }],
      screen: 'show',
    });

    saveAutosave();

    const stored = JSON.parse(window.localStorage.getItem(AUTOSAVE_KEY)!);
    expect(stored.exam).toEqual({ inShow: false });
    expect(stored.raw).toBe('some raw text');
  });

  it('persists full exam state once a real (non-calibration) session is in show', () => {
    useExamStore.setState({
      calibrating: false,
      screen: 'show',
      masterQuestions: [{ number: 1, text: 'Q', options: [], answer: null }],
      sets: [[]],
      slideIndex: 1,
      slideCount: 3,
      timeLeft: 20,
      slideDuration: 40,
      totalElapsed: 60,
      totalDuration: 300,
      paused: false,
    });

    saveAutosave();

    const stored = JSON.parse(window.localStorage.getItem(AUTOSAVE_KEY)!);
    expect(stored.exam.inShow).toBe(true);
    expect(stored.exam.masterQuestions).toHaveLength(1);
    expect(stored.exam.slideIndex).toBe(1);
  });
});

describe('persistence — two-commit-point last-settings rule', () => {
  beforeEach(resetAll);

  it('writes last-used settings on commitLastSettings (Meta "Next ->")', () => {
    commitLastSettings({ ...DEFAULT_META, subject: 'Microbiology' });
    const stored = JSON.parse(window.localStorage.getItem(LAST_SETTINGS_KEY)!);
    expect(stored.meta.subject).toBe('Microbiology');
    expect(stored.meta).not.toHaveProperty('date');
    expect(stored.meta).not.toHaveProperty('dateManuallySet');
  });

  it('writes the final built config on the Setup "Build slideshow ->" commit point', () => {
    const finalConfig = { ...DEFAULT_CONFIG, numSets: 4, perSlide: 3 };
    commitLastSettings(DEFAULT_META, finalConfig);
    const stored = JSON.parse(window.localStorage.getItem(LAST_SETTINGS_KEY)!);
    expect(stored.config.numSets).toBe(4);
    expect(stored.config.perSlide).toBe(3);
  });

  it('does NOT write last-used settings from a bare field edit / autosave', () => {
    useExamStore.setState({ config: { ...DEFAULT_CONFIG, numSets: 5 } });
    saveAutosave();
    expect(window.localStorage.getItem(LAST_SETTINGS_KEY)).toBeNull();
  });
});

describe('persistence — autosave wins over last-settings on reload', () => {
  beforeEach(resetAll);

  it('checkAutosave overrides loadLastSettings and forces navigation to Setup', () => {
    commitLastSettings({ ...DEFAULT_META, subject: 'Anatomy' });

    useExamStore.setState({
      calibrating: false,
      screen: 'show',
      rawInput: 'crash recovery raw text',
      masterQuestions: [{ number: 1, text: 'Q', options: [], answer: null }],
      sets: [[]],
    });
    saveAutosave();

    // Simulate a fresh app load: reset the in-memory store but leave
    // localStorage intact, matching source's load order (L2123-2126).
    useExamStore.setState(INITIAL_STATE);

    loadLastSettings();
    expect(useExamStore.getState().meta.subject).toBe('Anatomy');
    expect(useExamStore.getState().screen).toBe('meta');

    checkAutosave();
    expect(useExamStore.getState().screen).toBe('setup');
    expect(useExamStore.getState().resumeData).not.toBeNull();
    expect(useExamStore.getState().resumeData?.raw).toBe('crash recovery raw text');
  });

  it('checkAutosave is a no-op when there is nothing recoverable', () => {
    useExamStore.setState({ screen: 'meta' });
    checkAutosave();
    expect(useExamStore.getState().screen).toBe('meta');
    expect(useExamStore.getState().resumeData).toBeNull();
  });
});

describe('persistence — clearing on end / discard', () => {
  beforeEach(resetAll);

  it('endExamToSetup() clears the autosave entry', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    useExamStore.setState({ screen: 'show', calibrating: false });
    saveAutosave();
    expect(window.localStorage.getItem(AUTOSAVE_KEY)).not.toBeNull();

    useExamStore.getState().endExamToSetup();

    expect(window.localStorage.getItem(AUTOSAVE_KEY)).toBeNull();
    vi.restoreAllMocks();
  });

  it('reaching the end screen via goNextSlide() clears the autosave entry', () => {
    useExamStore.setState({
      screen: 'show',
      calibrating: false,
      masterQuestions: [{ number: 1, text: 'Q', options: [], answer: null }],
      slideIndex: 0,
      slideCount: 1,
    });
    saveAutosave();
    expect(window.localStorage.getItem(AUTOSAVE_KEY)).not.toBeNull();

    useExamStore.getState().goNextSlide();

    expect(window.localStorage.getItem(AUTOSAVE_KEY)).toBeNull();
    expect(useExamStore.getState().screen).toBe('end');
  });

  it('discardAutosave() clears autosave but leaves last-used settings untouched', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    commitLastSettings({ ...DEFAULT_META, subject: 'Physiology' });
    useExamStore.setState({
      screen: 'show',
      resumeData: {
        savedAt: Date.now(),
        raw: 'x',
        config: { ...DEFAULT_CONFIG },
        meta: { ...DEFAULT_META },
        exam: { inShow: false },
      },
    });
    saveAutosave();

    useExamStore.getState().discardAutosave();

    expect(window.localStorage.getItem(AUTOSAVE_KEY)).toBeNull();
    expect(useExamStore.getState().resumeData).toBeNull();
    const lastSettings = JSON.parse(window.localStorage.getItem(LAST_SETTINGS_KEY)!);
    expect(lastSettings.meta.subject).toBe('Physiology');
    vi.restoreAllMocks();
  });
});
```

### `store\persistence.ts`
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

### `tsconfig.json`
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

### `types\index.ts`
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

### `vitest.config.ts`
```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"],
  },
});
```

