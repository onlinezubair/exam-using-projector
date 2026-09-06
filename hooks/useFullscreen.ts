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