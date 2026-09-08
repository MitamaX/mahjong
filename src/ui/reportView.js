import { tileHtml } from './tileView.js';
import { OverlayView } from './overlayView.js';
import { SEAT_CLASSES, doraTilesHtml, riverRowsHtml } from './board.js';
import { button, classNames, div, escape, html, tag, text } from './markup.js';
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
const SAME_MARK = '=';
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
const formatted = (value, format) => (value === null ? DASH : format(value));

const SUMMARY_STATS = [
  { key: 'danger', format: percent },
  { key: 'shanten', format: points },
  { key: 'hits', format: ratio },
  { key: 'overall', format: score }
];

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

const tileCell = (tile, mark) => div(null, tileHtml(tile, { mark }));

const statHtml = (label, value, key) => div('stat', [
  text(label, 'stat__label'),
  tag('span', { class: 'stat__value', 'data-stat': key }, escape(value))
]);

const statsHtml = (entries, className = 'stats') =>
  div(className, entries.map(([label, value]) => statHtml(label, value)));

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

const noteHtml = (segments) => div('note', segments.map((part) =>
  (typeof part === 'string' ? text(part) : tileHtml(part.tile, { mark: part.mark }))));

const centerHtml = ({ turn, doraIndicator }, marks) => div('center', div('center__core', [
  text(strings().turnMark(turn), 'center__round'),
  div('rack center__dora', doraTilesHtml(doraIndicator, marks.get(doraIndicator) ?? null))
]));

const citedMarks = (segments) => new Map(segments
  .filter((part) => typeof part !== 'string')
  .map(({ tile, mark }) => [tile, mark]));

const ledgerHead = (dictionary) =>
  div('ledger__row ledger__row--head', LEDGER_KEYS.map((key) => text(dictionary.ledger[key])));

export const reportMarkup = (dictionary) => div('panel', [
  tag('header', { class: 'panel__head' }, [
    tag('span', { class: 'panel__title', 'data-outcome': true }),
    tag('span', { class: 'grade', 'data-grade': true })
  ]),
  div('stats stats--summary', SUMMARY_STATS.map(({ key }) => statHtml(dictionary.stat[key], '', key))),
  div('panel__body', [
    div('ledger', [ledgerHead(dictionary), tag('div', { class: 'ledger__records', 'data-records': true })]),
    div('detail', [
      tag('div', { class: 'detail__note', 'data-note': true }),
      tag('div', { class: 'table detail__board', 'data-board': true })
    ])
  ]),
  button(escape(dictionary.restart), { class: 'btn btn--accent btn--wide panel__action', 'data-restart': true })
]);

export class ReportView extends OverlayView {
  constructor(root, { onRestart }) {
    super(root);
    this.entries = [];
    this.node('restart').addEventListener('click', () => onRestart());
    this.node('records').addEventListener('click', (event) => {
      const row = event.target.closest('[data-record]');
      if (row) this.open(Number(row.dataset.record));
    });
  }

  show(report) {
    this.node('outcome').textContent = outcomeLabel(report.result);
    this.node('grade').textContent = report.grade;
    SUMMARY_STATS.forEach(({ key, format }) => {
      this.root.querySelector(`[data-stat="${key}"]`).textContent = formatted(report[key], format);
    });

    this.entries = report.records.map((record) => ({ record, segments: noteSegments(record) }));
    this.node('records').innerHTML = html(this.entries.map((entry, index) => [
      this.summaryRow(entry.record, index),
      this.drawerHtml(entry, index)
    ]));

    if (this.entries.length) this.open(0);
    else this.clearDetail();

    super.show();
  }

  summaryRow(record, index) {
    return button([
      text(record.turn),
      tileCell(record.picked.tile),
      record.best.tile === record.picked.tile
        ? text(SAME_MARK, 'ledger__same')
        : tileCell(record.best.tile),
      text(record.picked.shanten),
      text(percent(record.picked.danger)),
      text(strings().verdict[record.verdict], `verdict verdict--${record.verdict}`)
    ], { class: 'ledger__row', 'data-record': index });
  }

  drawerHtml({ record, segments }, index) {
    return tag('div', { class: 'drawer', 'data-drawer': index }, div('drawer__inner', [
      div('tile-tray', record.hand.map((tile) => tileHtml(tile, { mark: this.markOf(tile, record) }))),
      div('compare', this.compareRows(record)),
      noteHtml(segments)
    ]));
  }

  compareRows(record) {
    const { compare } = strings();
    const best = this.compareRow(compare.best, record.best, BEST_MARK);
    if (record.picked.tile === record.best.tile) return [best];
    return [this.compareRow(compare.picked, record.picked, PICK_MARK), best];
  }

  compareRow(label, stats, mark) {
    return div('compare__row', [
      text(label, 'compare__label'),
      tileCell(stats.tile, mark),
      statsHtml([
        [strings().stat.shanten, stats.shanten],
        [strings().stat.ukeire, stats.ukeire],
        [strings().stat.danger, percent(stats.danger)]
      ], COMPACT_STATS)
    ]);
  }

  open(index) {
    const drawer = this.root.querySelector(`[data-drawer="${index}"]`);
    if (drawer.classList.contains('drawer--on')) return;
    this.root.querySelectorAll('.ledger__row--on').forEach((node) => node.classList.remove('ledger__row--on'));
    this.root.querySelectorAll('.drawer--on').forEach((node) => node.classList.remove('drawer--on'));
    this.root.querySelector(`[data-record="${index}"]`).classList.add('ledger__row--on');
    drawer.classList.add('drawer--on');

    const { record, segments } = this.entries[index];
    const marks = citedMarks(segments);
    this.node('note').innerHTML = noteHtml(segments);
    this.node('board').innerHTML = html([
      SEAT_CLASSES.map((seatClass, seat) =>
        div(classNames('seat', seatClass), div('river', riverRowsHtml(record.rivers[seat], marks)))),
      centerHtml(record, marks)
    ]);
  }

  clearDetail() {
    ['note', 'board'].forEach((name) => { this.node(name).innerHTML = ''; });
  }

  markOf(tile, record) {
    if (tile === record.best.tile) return BEST_MARK;
    if (tile === record.picked.tile) return PICK_MARK;
    return null;
  }
}
