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