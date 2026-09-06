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

