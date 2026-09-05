import { tileNode } from './tileView.js';

const RIVER_COLUMNS = Number(getComputedStyle(document.documentElement).getPropertyValue('--river-cols'));

const DORA_SLOTS = 5;

export const SEAT_CLASSES = ['seat--self', 'seat--right', 'seat--across', 'seat--left'];

export function riverRows(entries, marks = new Map()) {
  const rows = [];
  entries.forEach((entry, index) => {
    if (index % RIVER_COLUMNS === 0) {
      const row = document.createElement('div');
      row.className = 'river__row';
      rows.push(row);
    }
    const tile = tileNode(entry.tile, { turned: entry.turned, mark: marks.get(entry.tile) ?? null });
    rows[rows.length - 1].appendChild(tile);
  });
  return rows;
}

export function doraTiles(indicator, mark = null) {
  return [
    tileNode(indicator, { mark }),
    ...Array.from({ length: DORA_SLOTS - 1 }, () => tileNode(0, { back: true }))
  ];
}
