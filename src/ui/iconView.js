const VIEW = 24;
const CENTER = VIEW / 2;
const GEAR = { teeth: 8, toothWidth: 3.2, toothTop: 1.5, toothLength: 5, radius: 4.6, stroke: 3 };
const QUESTION = { size: 24, baseline: 8.4 };

function gearTeeth() {
  const step = 360 / GEAR.teeth;
  return Array.from({ length: GEAR.teeth }, (unused, index) =>
    `<rect x="${CENTER - GEAR.toothWidth / 2}" y="${GEAR.toothTop}"`
    + ` width="${GEAR.toothWidth}" height="${GEAR.toothLength}" rx="${GEAR.toothWidth / 2}"`
    + ` transform="rotate(${step * index} ${CENTER} ${CENTER})"/>`).join('');
}

const ICONS = {
  settings: () => `${gearTeeth()}`
    + `<circle cx="${CENTER}" cy="${CENTER}" r="${GEAR.radius}" fill="none"`
    + ` stroke="currentColor" stroke-width="${GEAR.stroke}"/>`,
  help: () => `<text x="${CENTER}" y="${CENTER + QUESTION.baseline}" font-size="${QUESTION.size}">?</text>`
};

export function iconSvg(name) {
  return `<svg viewBox="0 0 ${VIEW} ${VIEW}" fill="currentColor" text-anchor="middle" font-weight="800" aria-hidden="true">${ICONS[name]()}</svg>`;
}
