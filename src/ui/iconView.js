const VIEW = 24;
const CENTER = VIEW / 2;
const GEAR = { teeth: 8, tip: 10.8, root: 7.8, tipShare: 0.34, rootShare: 0.5, hole: 4, round: 1 };
const RIGHT_ANGLE = 90;
const PRECISION = 2;
const QUESTION = { size: 24, baseline: 8.4 };
const CHECK = { path: 'M5 12.5 9.8 17.2 19 7', stroke: 3 };
const CHEVRON = { path: 'M6 9.5 12 15.5 18 9.5', stroke: 3 };
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

const coordinate = (value) => Number(value.toFixed(PRECISION));

function polar(radius, degrees) {
  const radians = (degrees - RIGHT_ANGLE) * Math.PI / 180;
  return `${coordinate(CENTER + radius * Math.cos(radians))} ${coordinate(CENTER + radius * Math.sin(radians))}`;
}

function gearRim() {
  const pitch = 360 / GEAR.teeth;
  const tipHalf = pitch * GEAR.tipShare / 2;
  const rootHalf = pitch * GEAR.rootShare / 2;
  return `${Array.from({ length: GEAR.teeth }, (unused, index) => {
    const angle = pitch * index;
    return `${index ? 'L' : 'M'}${polar(GEAR.root, angle - rootHalf)}`
      + `L${polar(GEAR.tip, angle - tipHalf)}L${polar(GEAR.tip, angle + tipHalf)}`
      + `L${polar(GEAR.root, angle + rootHalf)}`
      + `A${GEAR.root} ${GEAR.root} 0 0 1 ${polar(GEAR.root, angle + pitch - rootHalf)}`;
  }).join('')}Z`;
}

function gearHole() {
  const { hole } = GEAR;
  return `M${CENTER + hole} ${CENTER}A${hole} ${hole} 0 1 0 ${CENTER - hole} ${CENTER}`
    + `A${hole} ${hole} 0 1 0 ${CENTER + hole} ${CENTER}Z`;
}

const strokePath = ({ path, stroke }) => `<path d="${path}" fill="none" stroke="currentColor" stroke-width="${stroke}"`
  + ' stroke-linecap="round" stroke-linejoin="round"/>';

const ICONS = {
  settings: () => `<path d="${gearRim()}${gearHole()}" fill-rule="evenodd"`
    + ` stroke="currentColor" stroke-width="${GEAR.round}" stroke-linejoin="round"/>`,
  help: () => `<text x="${CENTER}" y="${CENTER + QUESTION.baseline}" font-size="${QUESTION.size}">?</text>`,
  check: () => strokePath(CHECK),
  chevron: () => strokePath(CHEVRON),
  github: () => `<path transform="scale(${VIEW / GITHUB.span})" d="${GITHUB.path}"/>`
};

export function iconSvg(name) {
  return `<svg viewBox="0 0 ${VIEW} ${VIEW}" fill="currentColor" text-anchor="middle" font-weight="800" aria-hidden="true">${ICONS[name]()}</svg>`;
}
