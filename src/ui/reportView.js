import { tileNode } from './tileView.js';
import { SEAT_CLASSES, riverRows } from './board.js';
import { PLAYER } from '../core/round.js';
import { GUARD } from '../core/danger.js';

const STANCE_LABELS = { build: '조패', push: '오시', fold: '오리' };
const BUILD_STANCE = 'build';
const PUSH_STANCE = 'push';
const FOLD_STANCE = 'fold';
const TILE_COPIES = 4;
const SAFE_GUARDS = [GUARD.GENBUTSU, GUARD.SUJI, GUARD.HONOR];
const CITE_SEPARATOR = '·';
const LEDGER_HEADS = ['순', '선택', '최선', '국면', '샨텐', '위험', '판정'];
const COMPACT_STATS = 'stats stats--compact';
const BEST_MARK = 'best';
const PICK_MARK = 'pick';
const CITE_MARK = 'cite';
const guardText = ({ kind, left }) => (left === null ? kind : `${TILE_COPIES - left}장 보이는 ${kind}`);
const citeList = (cites) => cites
  .map((tile) => cited(tile, CITE_MARK))
  .flatMap((part, index) => (index ? [CITE_SEPARATOR, part] : [part]));

const EDGES = {
  shanten: { label: '샨텐수를 늘리지 않는', holds: (best, picked) => best.shanten < picked.shanten },
  ukeire: { label: '유효패가 더 많은', holds: (best, picked) => best.ukeire > picked.ukeire },
  safety: {
    label: '더 안전한',
    holds: (best, picked) => best.danger < picked.danger && best.guard?.kind !== GUARD.GENBUTSU
  }
};

const EDGE_PRIORITY = {
  [BUILD_STANCE]: ['shanten', 'ukeire', 'safety'],
  [PUSH_STANCE]: ['shanten', 'safety', 'ukeire'],
  [FOLD_STANCE]: ['safety', 'shanten', 'ukeire']
};

function edgeLabel(best, picked, stance) {
  if (best.tile === picked.tile) return '';
  const edge = EDGE_PRIORITY[stance].find((name) => EDGES[name].holds(best, picked));
  return edge ? `${EDGES[edge].label} ` : '';
}

function outcomeLabel(result) {
  if (!result) return '중단';
  if (result.type === 'draw') return '유국';
  if (result.type === 'tsumo') return '쯔모';
  return result.from === PLAYER ? '방총' : '론';
}

function scoreText(value) {
  return value === null ? '—' : Math.round(value);
}

function shantenText(value) {
  return value === null ? '—' : value.toFixed(1);
}

function dangerText(stance, danger) {
  return stance === BUILD_STANCE ? '—' : `${danger.toFixed(1)}%`;
}

function span(text, className) {
  const node = document.createElement('span');
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
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

function noteSegments({ best, picked, stance }) {
  const choice = cited(best.tile, BEST_MARK);
  const edge = edgeLabel(best, picked, stance);
  if (stance !== FOLD_STANCE) return [choice, `가 유효패 ${best.ukeire}장으로 최선.`];
  if (best.guard.kind === GUARD.KABE) return [...citeList(best.guard.cites), '가 벽이기에', choice, '가 최선.'];
  if (best.guard.kind === GUARD.SUJI) {
    return [choice, `가 ${edge}`, ...citeList(best.guard.cites), `의 ${guardText(best.guard)}이기에 최선.`];
  }
  if (SAFE_GUARDS.includes(best.guard.kind)) return [choice, `가 ${edge}${guardText(best.guard)}이기에 최선.`];
  return [choice, `가 위험 ${best.danger.toFixed(1)}%로 최선.`];
}

function noteNode(segments) {
  return box('note', segments.map((part) =>
    (typeof part === 'string' ? span(part) : tileNode(part.tile, { mark: part.mark }))));
}

function centerNode(turn) {
  return box('center', [box('center__core', [span(`${turn}순`, 'center__round')])]);
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
      ['오시', scoreText(report.push)],
      ['오리', scoreText(report.fold)],
      ['샨텐', shantenText(report.shanten)],
      ['종합', scoreText(report.overall)]
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
      span(STANCE_LABELS[record.stance]),
      span(record.picked.shanten),
      span(dangerText(record.stance, record.picked.danger)),
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
    const best = this.compareRow('최선', record.best, record.stance, BEST_MARK);
    if (record.picked.tile === record.best.tile) return [best];
    return [this.compareRow('선택', record.picked, record.stance, PICK_MARK), best];
  }

  open({ record, row, drawer }) {
    if (drawer.classList.contains('drawer--on')) return;
    this.root.querySelectorAll('.ledger__row--on').forEach((node) => node.classList.remove('ledger__row--on'));
    this.root.querySelectorAll('.drawer--on').forEach((node) => node.classList.remove('drawer--on'));
    row.classList.add('ledger__row--on');
    drawer.classList.add('drawer--on');
    const segments = noteSegments(record);
    this.node('note').replaceChildren(noteNode(segments));
    this.node('board').replaceChildren(
      ...this.seatFrames(record.rivers, citedMarks(segments)),
      centerNode(record.turn)
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

  compareRow(label, stats, stance, mark) {
    return box('compare__row', [
      span(label, 'compare__label'),
      tileCell(stats.tile, mark),
      statsNode([
        ['샨텐', stats.shanten],
        ['유효패', stats.ukeire],
        ['위험', dangerText(stance, stats.danger)]
      ], COMPACT_STATS)
    ]);
  }
}
