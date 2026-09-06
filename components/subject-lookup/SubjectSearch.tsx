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