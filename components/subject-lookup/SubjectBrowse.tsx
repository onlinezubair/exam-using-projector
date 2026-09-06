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