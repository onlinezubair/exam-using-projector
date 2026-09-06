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