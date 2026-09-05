import { tileNode } from './tileView.js';
import { SEAT_CLASSES, riverRows, doraTiles } from './board.js';
import { PLAYER } from '../core/round.js';
import { GUARD } from '../core/danger.js';

const TILE_COPIES = 4;
const SAFE_GUARDS = [GUARD.GENBUTSU, GUARD.SUJI, GUARD.HONOR];
const CITE_SEPARATOR = '·';
const LEDGER_HEADS = ['순', '선택', '최선', '샨텐', '위험', '판정'];
const COMPACT_STATS = 'stats stats--compact';
const BEST_MARK = 'best';
const PICK_MARK = 'pick';
const CITE_MARK = 'cite';
const EDGES = [
  { label: '더 안전한', holds: (best, picked) => best.danger < picked.danger },
  { label: '샨텐수를 늘리지 않는', holds: (best, picked) => best.shanten < picked.shanten },
  { label: '유효패가 더 많은', holds: (best, picked) => best.ukeire > picked.ukeire }
];
const DASH = '—';

const percent = (value) => `${value.toFixed(1)}%`;
const points = (value) => value.toFixed(1);
const rounded = (value) => `${Math.round(value)}`;
const ratio = (value) => `${Math.round(value)}%`;
const text = (value, format) => (value === null ? DASH : format(value));

const guardText = ({ kind, left }) => (left === null ? kind : `${TILE_COPIES - left}장 보이는 ${kind}`);
const citeList = (cites) => cites
  .map((tile) => cited(tile, CITE_MARK))
  .flatMap((part, index) => (index ? [CITE_SEPARATOR, part] : [part]));

const sharesGuard = (best, picked) => (best.guard?.kind ?? null) === (picked.guard?.kind ?? null);

function edgeLabel(best, picked) {
  if (best.tile === picked.tile || !sharesGuard(best, picked)) return '';
  const edge = EDGES.find(({ holds }) => holds(best, picked));
  return edge ? `${edge.label} ` : '';
}

function outcomeLabel(result) {
  if (!result) return '중단';
  if (result.type === 'draw') return '유국';
  if (result.type === 'tsumo') return '쯔모';
  return result.from === PLAYER ? '방총' : '론';
}

function span(content, className) {
  const node = document.createElement('span');
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}

function box(className, children) {
  const node = document.createElement('div');
  if (className) node.className = className;
  node.append(...children);
  return node;
}

function tileCell(tile, mark) {
  return box(null, [tileNode(tile, { mark })]);
}

function statNodes(entries) {
  return entries.map(([label, value]) =>
    box('stat', [span(label, 'stat__label'), span(value, 'stat__value')]));
}

function statsNode(entries, className = 'stats') {
  return box(className, statNodes(entries));
}

function cited(tile, mark) {
  return { tile, mark };
}

function noteSegments({ best, picked }) {
  const choice = cited(best.tile, BEST_MARK);
  const edge = edgeLabel(best, picked);
  if (best.guard.kind === GUARD.KABE) return [...citeList(best.guard.cites), '가 벽이기에', choice, '가 최선.'];
  if (best.guard.kind === GUARD.SUJI) {
    return [choice, `가 ${edge}`, ...citeList(best.guard.cites), `의 ${guardText(best.guard)}이기에 최선.`];
  }
  if (SAFE_GUARDS.includes(best.guard.kind)) return [choice, `가 ${edge}${guardText(best.guard)}이기에 최선.`];
  return [choice, `가 위험 ${percent(best.danger)}로 최선.`];
}

function noteNode(segments) {
  return box('note', segments.map((part) =>
    (typeof part === 'string' ? span(part) : tileNode(part.tile, { mark: part.mark }))));
}

function doraNode(indicator, marks) {
  return box('center__dora', doraTiles(indicator, marks.get(indicator) ?? null));
}

function centerNode({ turn, doraIndicator }, marks) {
  return box('center', [box('center__core', [
    span(`${turn}순`, 'center__round'),
    doraNode(doraIndicator, marks)
  ])]);
}

function citedMarks(segments) {
  return new Map(segments
    .filter((part) => typeof part !== 'string')
    .map(({ tile, mark }) => [tile, mark]));
}

export class ReportView {
  constructor(root, { onRestart }) {
    this.root = root;
    this.root.innerHTML = `
      <div class="panel">
        <header class="panel__head">
          <span class="panel__title" data-outcome></span>
          <span class="grade" data-grade></span>
        </header>
        <div class="stats" data-summary></div>
        <div class="panel__body">
          <div class="ledger" data-ledger></div>
          <div class="detail">
            <div data-note></div>
            <div class="table detail__board" data-board></div>
          </div>
        </div>
        <button class="btn btn--accent btn--wide" type="button" data-restart>다시</button>
      </div>
    `;
    this.node('restart').addEventListener('click', () => onRestart());
  }

  node(name) {
    return this.root.querySelector(`[data-${name}]`);
  }

  show(report) {
    this.node('outcome').textContent = outcomeLabel(report.result);
    this.node('grade').textContent = report.grade;
    this.node('summary').replaceChildren(...statNodes([
      ['위험', text(report.danger, percent)],
      ['샨텐', text(report.shanten, points)],
      ['최선', text(report.hits, ratio)],
      ['종합', text(report.overall, rounded)]
    ]));

    const entries = report.records.map((record) => this.entry(record));
    this.node('ledger').replaceChildren(
      this.headRow(),
      ...entries.flatMap(({ row, drawer }) => [row, drawer])
    );
    if (entries.length) this.open(entries[0]);
    else this.clearDetail();

    this.root.hidden = false;
  }

  hide() {
    this.root.hidden = true;
  }

  headRow() {
    return box('ledger__row ledger__row--head', LEDGER_HEADS.map((label) => span(label)));
  }

  entry(record) {
    const entry = { record, row: this.summaryRow(record), drawer: this.drawerNode(record) };
    entry.row.addEventListener('click', () => this.open(entry));
    return entry;
  }

  summaryRow(record) {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'ledger__row';
    row.append(
      span(record.turn),
      tileCell(record.picked.tile),
      record.best.tile === record.picked.tile ? span('=', 'ledger__same') : tileCell(record.best.tile),
      span(record.picked.shanten),
      span(percent(record.picked.danger)),
      span(record.verdict, `verdict verdict--${record.verdict}`)
    );
    return row;
  }

  drawerNode(record) {
    const hand = box('tile-tray', record.hand.map((tile) => tileNode(tile, { mark: this.markOf(tile, record) })));
    const compare = box('compare', this.compareRows(record));
    return box('drawer', [box('drawer__inner', [hand, compare])]);
  }

  compareRows(record) {
    const best = this.compareRow('최선', record.best, BEST_MARK);
    if (record.picked.tile === record.best.tile) return [best];
    return [this.compareRow('선택', record.picked, PICK_MARK), best];
  }

  open({ record, row, drawer }) {
    if (drawer.classList.contains('drawer--on')) return;
    this.root.querySelectorAll('.ledger__row--on').forEach((node) => node.classList.remove('ledger__row--on'));
    this.root.querySelectorAll('.drawer--on').forEach((node) => node.classList.remove('drawer--on'));
    row.classList.add('ledger__row--on');
    drawer.classList.add('drawer--on');
    const segments = noteSegments(record);
    const marks = citedMarks(segments);
    this.node('note').replaceChildren(noteNode(segments));
    this.node('board').replaceChildren(
      ...this.seatFrames(record.rivers, marks),
      centerNode(record, marks)
    );
  }

  clearDetail() {
    ['note', 'board'].forEach((name) => this.node(name).replaceChildren());
  }

  seatFrames(rivers, marks) {
    return SEAT_CLASSES.map((seatClass, seat) =>
      box(`seat ${seatClass}`, [box('river', riverRows(rivers[seat], marks))]));
  }

  markOf(tile, record) {
    if (tile === record.best.tile) return BEST_MARK;
    if (tile === record.picked.tile) return PICK_MARK;
    return null;
  }

  compareRow(label, stats, mark) {
    return box('compare__row', [
      span(label, 'compare__label'),
      tileCell(stats.tile, mark),
      statsNode([
        ['샨텐', stats.shanten],
        ['유효패', stats.ukeire],
        ['위험', percent(stats.danger)]
      ], COMPACT_STATS)
    ]);
  }
}
