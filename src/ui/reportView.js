import { tileNode } from './tileView.js';
import { OverlayView } from './overlayView.js';
import { SEAT_CLASSES, riverRows, doraTiles } from './board.js';
import { box, span } from './dom.js';
import { PLAYER } from '../core/round.js';
import { GUARD } from '../core/danger.js';
import { COPIES } from '../core/tiles.js';
import { strings } from '../i18n/index.js';

const SAFE_GUARDS = [GUARD.GENBUTSU, GUARD.SUJI, GUARD.HONOR];
const CITE_SEPARATOR = '·';
const LEDGER_KEYS = ['turn', 'picked', 'best', 'shanten', 'danger', 'verdict'];
const COMPACT_STATS = 'stats stats--compact';
const BEST_MARK = 'best';
const PICK_MARK = 'pick';
const CITE_MARK = 'cite';
const EDGES = [
  { key: 'danger', holds: (best, picked) => best.danger < picked.danger },
  { key: 'shanten', holds: (best, picked) => best.shanten < picked.shanten },
  { key: 'ukeire', holds: (best, picked) => best.ukeire > picked.ukeire }
];
const DASH = '—';

const percent = (value) => `${value.toFixed(1)}%`;
const points = (value) => value.toFixed(1);
const score = (value) => strings().score(Math.round(value));
const ratio = (value) => `${Math.round(value)}%`;
const text = (value, format) => (value === null ? DASH : format(value));

function guardText({ kind, left }) {
  const name = strings().guard[kind];
  return left === null ? name : strings().seen(COPIES - left, name);
}

const citeList = (cites) => cites
  .map((tile) => cited(tile, CITE_MARK))
  .flatMap((part, index) => (index ? [CITE_SEPARATOR, part] : [part]));

const sharesGuard = (best, picked) => (best.guard?.kind ?? null) === (picked.guard?.kind ?? null);

function edgeLabel(best, picked) {
  if (best.tile === picked.tile || !sharesGuard(best, picked)) return '';
  const edge = EDGES.find(({ holds }) => holds(best, picked));
  return edge ? strings().edge[edge.key] : '';
}

function outcomeLabel(result) {
  const { outcome } = strings();
  if (!result) return outcome.aborted;
  if (result.type === 'draw') return outcome.draw;
  if (result.type === 'tsumo') return outcome.tsumo;
  return result.from === PLAYER ? outcome.dealIn : outcome.ron;
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
  const { note } = strings();
  const choice = cited(best.tile, BEST_MARK);
  const edge = edgeLabel(best, picked);
  const cites = citeList(best.guard.cites);
  const guard = guardText(best.guard);
  if (best.guard.kind === GUARD.KABE) return note.kabe({ choice, cites });
  if (best.guard.kind === GUARD.SUJI) return note.suji({ choice, cites, edge, guard });
  if (SAFE_GUARDS.includes(best.guard.kind)) return note.safe({ choice, edge, guard });
  return note.risk({ choice, danger: percent(best.danger) });
}

function noteNode(segments) {
  return box('note', segments.map((part) =>
    (typeof part === 'string' ? span(part) : tileNode(part.tile, { mark: part.mark }))));
}

function doraNode(indicator, marks) {
  return box('rack center__dora', doraTiles(indicator, marks.get(indicator) ?? null));
}

function centerNode({ turn, doraIndicator }, marks) {
  return box('center', [box('center__core', [
    span(strings().turnMark(turn), 'center__round'),
    doraNode(doraIndicator, marks)
  ])]);
}

function citedMarks(segments) {
  return new Map(segments
    .filter((part) => typeof part !== 'string')
    .map(({ tile, mark }) => [tile, mark]));
}

export class ReportView extends OverlayView {
  constructor(root, { onRestart }) {
    super(root);
    this.onRestart = onRestart;
    this.build();
  }

  build() {
    this.root.innerHTML = `
      <div class="panel">
        <header class="panel__head">
          <span class="panel__title" data-outcome></span>
          <span class="grade" data-grade></span>
        </header>
        <div class="stats stats--summary" data-summary></div>
        <div class="panel__body">
          <div class="ledger" data-ledger></div>
          <div class="detail">
            <div class="detail__note" data-note></div>
            <div class="table detail__board" data-board></div>
          </div>
        </div>
        <button class="btn btn--accent btn--wide" type="button" data-restart>${strings().restart}</button>
      </div>
    `;
    this.node('restart').addEventListener('click', () => this.onRestart());
  }

  rebuild() {
    const reopen = this.visible && this.report;
    this.build();
    if (reopen) this.show(this.report);
    else this.hide();
  }

  show(report) {
    this.report = report;
    const { stat } = strings();
    this.node('outcome').textContent = outcomeLabel(report.result);
    this.node('grade').textContent = report.grade;
    this.node('summary').replaceChildren(...statNodes([
      [stat.danger, text(report.danger, percent)],
      [stat.shanten, text(report.shanten, points)],
      [stat.hits, text(report.hits, ratio)],
      [stat.overall, text(report.overall, score)]
    ]));

    const entries = report.records.map((record) => this.entry(record));
    this.node('ledger').replaceChildren(
      this.headRow(),
      ...entries.flatMap(({ row, drawer }) => [row, drawer])
    );
    if (entries.length) this.open(entries[0]);
    else this.clearDetail();

    super.show();
  }

  headRow() {
    return box('ledger__row ledger__row--head', LEDGER_KEYS.map((key) => span(strings().ledger[key])));
  }

  entry(record) {
    const segments = noteSegments(record);
    const entry = { record, segments, row: this.summaryRow(record), drawer: this.drawerNode(record, segments) };
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
      span(strings().verdict[record.verdict], `verdict verdict--${record.verdict}`)
    );
    return row;
  }

  drawerNode(record, segments) {
    const hand = box('tile-tray', record.hand.map((tile) => tileNode(tile, { mark: this.markOf(tile, record) })));
    const compare = box('compare', this.compareRows(record));
    return box('drawer', [box('drawer__inner', [hand, compare, noteNode(segments)])]);
  }

  compareRows(record) {
    const { compare } = strings();
    const best = this.compareRow(compare.best, record.best, BEST_MARK);
    if (record.picked.tile === record.best.tile) return [best];
    return [this.compareRow(compare.picked, record.picked, PICK_MARK), best];
  }

  open({ record, segments, row, drawer }) {
    if (drawer.classList.contains('drawer--on')) return;
    this.root.querySelectorAll('.ledger__row--on').forEach((node) => node.classList.remove('ledger__row--on'));
    this.root.querySelectorAll('.drawer--on').forEach((node) => node.classList.remove('drawer--on'));
    row.classList.add('ledger__row--on');
    drawer.classList.add('drawer--on');
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
        [strings().stat.shanten, stats.shanten],
        [strings().stat.ukeire, stats.ukeire],
        [strings().stat.danger, percent(stats.danger)]
      ], COMPACT_STATS)
    ]);
  }
}
