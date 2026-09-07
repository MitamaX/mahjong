const VIEW = 24;
const CENTER = VIEW / 2;
const GEAR = { teeth: 8, toothWidth: 3.2, toothTop: 1.5, toothLength: 5, radius: 4.6, stroke: 3 };
const QUESTION = { size: 24, baseline: 8.4 };
const GITHUB = {
  span: 16,
  path: 'M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38'
    + ' 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95'
    + ' 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27'
    + '-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15'
    + ' 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82'
    + '-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49'
    + ' 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z'
};

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
  help: () => `<text x="${CENTER}" y="${CENTER + QUESTION.baseline}" font-size="${QUESTION.size}">?</text>`,
  github: () => `<path transform="scale(${VIEW / GITHUB.span})" d="${GITHUB.path}"/>`
};

export function iconSvg(name) {
  return `<svg viewBox="0 0 ${VIEW} ${VIEW}" fill="currentColor" text-anchor="middle" font-weight="800" aria-hidden="true">${ICONS[name]()}</svg>`;
}
