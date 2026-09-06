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

Two latent wiring bugs were found and fixed during Milestone 9 QA — see
"Post-Milestone-9 fixes" below. The table status below reflects the
original Milestone 8 sign-off; treat it alongside that section, not in
isolation.

| Milestone | Scope | Status |
|---|---|---|
| 1 | Next.js scaffold, Zustand, theme | Done |
| 2 | Types + lib ports (parser, shuffle, courses, meta) | Done |
| 3 | Meta / Setup screens | Done |
| 4 | Setup screen, demo questions, AI prompt helper | Done |
| 5 | Slideshow screen: calibration mode | Done |
| 6a | Real exam timer (countdown, beeps, pause) | Done |
| 6b | Keyboard shortcuts, fullscreen, beforeunload guard | Done |
| 7 | Persistence: autosave, last-used settings, resume banner | Done (see fixes below — init call was missing) |
| 8 | EndScreen (answer key + ZIP/CSV export), Print Backup overlay, wired 'P' key | Done — build verified green (`npm run test` + `npm run build`) (see fixes below — 'P' key was NOT actually wired) |
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
- ~~`'P'` (print backup) was deliberately left unwired in `useKeyboardShortcuts.ts`
  until Milestone 8, since `usePrintBackup`/`PrintArea` didn't exist before then.~~
  Superseded — see "Post-Milestone-9 fixes" below. `usePrintBackup`/`PrintArea`
  were built during Milestone 8, but the key wiring itself was never revisited
  and the stale "not wired yet" comment stayed in the file uncorrected.
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

## Post-Milestone-9 fixes (2026-09-06)

Manual QA surfaced two real bugs the Milestone 7/8 "Done" status did not
catch, both now fixed and verified (`tsc --noEmit` + `npm run test`, both
passing):

1. **`loadLastSettings()`/`checkAutosave()` never invoked.** Both were fully
   implemented in `store/persistence.ts` (and covered by
   `persistence.test.ts`) but nothing ever called them — there was no
   mount-time equivalent of source's `loadLastSettings(); checkAutosave();`
   (v8 source L2125-2126). Fixed by calling both, in that order, in a
   `useEffect(() => { ... }, [])` in `components/ExamApp.tsx`, matching the
   plan doc's §8 ordering requirement (last-used settings first, autosave
   check second, so a recoverable session still wins).
2. **`P` key (print backup) still unwired.** `hooks/useKeyboardShortcuts.ts`
   still carried the Milestone-8-era comment stating it was intentionally
   left unwired until `usePrintBackup`/`PrintArea` existed — but both had
   since been built and were already wired everywhere else (`EndScreen.tsx`,
   `Bottombar.tsx`). Fixed by wiring `usePrintBackup()` into the hook's
   keydown handler, matching source's `if (e.key.toLowerCase() === 'p'){
   e.preventDefault(); printBackup(); }` (v8 source L2005).

**Lesson (reinforcing the Milestone 8 postmortem above):** a milestone
status of "Done" means the code for that milestone was written and typed
correctly — it does not guarantee every piece was actually *invoked*.
Manual QA (Milestone 9) is what catches "implemented but never called."

**Tooling lesson:** don't build markdown-content here-strings with
PowerShell's double-quoted `@" ... "@` syntax — backtick is PowerShell's
escape character, and markdown code-spans are full of backticks (e.g.
`` `useEffect()` `` gets misread as a `\u{...}` escape attempt and throws a
parser error before any file write happens). Either use a single-quoted
`@' ... '@` here-string (no escape processing at all), or — for content this
size/prose-heavy — just author the file directly rather than round-tripping
it through a PowerShell string.

Still outstanding from Milestone 9: browser-level manual check that
pressing `P` mid-exam shows a no-answers print preview and leaves the
running timer untouched underneath.

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
