import { tileHtml } from './tileView.js';
import { classNames, div, tag, text } from './markup.js';

const SPAN = { tile: 1.1, turned: 1.5, gap: 0.5, op: 1, times: 1.6, ring: 5.4 };
const FIGURE_COLUMNS = '--figure-cols';
const FIGURE_ROWS = '--figure-rows';
const SPAN_DIGITS = 2;
const TIMES_MARK = '×';

const uncaptioned = () => null;

const isOperator = (part) => typeof part === 'string';

const tileSpan = ({ turned }) => (turned ? SPAN.turned : SPAN.tile);

const timesSpan = (times) => (times ? SPAN.gap + SPAN.times : 0);

const partSpan = (part) => (isOperator(part)
  ? SPAN.op
  : part.tiles.reduce((span, entry) => span + tileSpan(entry), timesSpan(part.times)));

const rowSpan = (row) => row.reduce((span, part) => span + partSpan(part), (row.length - 1) * SPAN.gap);

const figureSpan = ({ rows, times, ring }) => (ring ? SPAN.ring : Math.max(...rows.map(rowSpan))) + timesSpan(times);

const figureDepth = ({ rows }) => rows.length;

const timesHtml = (times, className) => text(`${TIMES_MARK} ${times}`, className);

const tilesHtml = (part) => {
  const row = div('tile-row', part.tiles.map(({ tile, turned }) =>
    tileHtml(tile, { turned, mark: part.marks.get(tile) ?? part.mark ?? null })));
  return part.times ? div('figure__count', [row, timesHtml(part.times, 'figure__times figure__times--group')]) : row;
};

export const figureStyle = (...figures) => [
  `${FIGURE_COLUMNS}: ${Math.max(...figures.map(figureSpan)).toFixed(SPAN_DIGITS)}`,
  `${FIGURE_ROWS}: ${Math.max(...figures.map(figureDepth))}`
].join('; ');

const groupHtml = (captionOf) => (part) => {
  if (isOperator(part)) return text(part, 'figure__op');
  const caption = captionOf(part.key);
  return tag('div', {
    class: classNames('figure__group', part.wrong && 'figure__group--wrong'),
    'data-group': part.tag ?? part.key
  }, [
    tilesHtml(part),
    caption && text(caption, 'figure__caption')
  ]);
};

const ringHtml = ([parts], captionOf) => tag('div', { class: 'figure__ring', style: `--count: ${parts.length / 2}` },
  parts.map((part, index) => tag('div', { class: 'figure__slot', style: `--slot: ${index / 2}` }, groupHtml(captionOf)(part))));

const rowsHtml = (rows, captionOf) => div('figure__rows', rows.map((row) => div('figure__row', row.map(groupHtml(captionOf)))));

export const figureHtml = ({ rows, times, ring }, attrs, captionOf = uncaptioned) => tag('div', attrs, [
  (ring ? ringHtml : rowsHtml)(rows, captionOf),
  times && timesHtml(times, 'figure__times')
]);
