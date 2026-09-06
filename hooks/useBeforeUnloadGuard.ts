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