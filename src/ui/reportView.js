import { tileNode } from './tileView.js';
import { SEAT_CLASSES, riverRows } from './board.js';
import { PLAYER } from '../core/round.js';

const STANCE_LABELS = { build: '조패', push: '오시', fold: '오리' };

function outcomeLabel(result) {
  if (!result) return '중단';
  if (result.type === 'draw') return '유국';
  if (result.type === 'tsumo') return result.winner === PLAYER ? '쯔모' : '타가쯔모';
  if (result.winner === PLAYER) return '론';
  return result.from === PLAYER ? '방총' : '타가론';
}

function statNode(label, value) {
  const node = document.createElement('div');
  node.className = 'stat';
  node.innerHTML = `<span class="stat__label">${label}</span><span class="stat__value">${value}</span>`;
  return node;
}

function scoreText(value) {
  return value === null ? '—' : Math.round(value);
}

function shantenText(value) {
  return value === null ? '—' : value.toFixed(1);
}

function dangerText(stance, danger) {
  return stance === 'build' ? '—' : `${danger.toFixed(1)}%`;
}

function span(text, className) {
  const node = document.createElement('span');
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export class ReportView {
  constructor(root, { onRestart }) {
    this.root = root;
    this.onRestart = onRestart;
    this.root.innerHTML = `
      <div class="panel">
        <header class="panel__head">
          <span class="panel__title" data-outcome></span>
          <span class="grade" data-grade></span>
        </header>
        <div class="stats" data-stats></div>
        <div class="panel__body">
          <div class="ledger" data-ledger></div>
          <div class="detail" data-detail></div>
        </div>
        <button class="btn btn--accent btn--wide" type="button" data-restart>다시</button>
      </div>
    `;
    this.root.querySelector('[data-restart]').addEventListener('click', () => this.onRestart());
  }

  show(report) {
    this.root.querySelector('[data-outcome]').textContent = outcomeLabel(report.result);
    this.root.querySelector('[data-grade]').textContent = report.grade;

    this.root.querySelector('[data-stats]').replaceChildren(
      statNode('오시', scoreText(report.push)),
      statNode('오리', scoreText(report.fold)),
      statNode('샨텐', shantenText(report.shanten)),
      statNode('종합', scoreText(report.overall))
    );

    const rows = report.records.map((record) => this.rowNode(record));
    this.root.querySelector('[data-ledger]').replaceChildren(this.headRow(), ...rows);
    this.root.querySelector('[data-detail]').replaceChildren();
    if (rows.length) this.select(report.records[0], rows[0]);

    this.root.hidden = false;
  }

  hide() {
    this.root.hidden = true;
  }

  headRow() {
    const row = document.createElement('div');
    row.className = 'ledger__row ledger__row--head';
    row.append(...['순', '선택', '최선', '국면', '샨텐', '위험', '판정'].map((label) => span(label)));
    return row;
  }

  rowNode(record) {
    const row = this.summaryRow(record);
    row.addEventListener('click', () => this.select(record, row));
    return row;
  }

  select(record, row) {
    this.root.querySelectorAll('.ledger__row--on').forEach((node) => node.classList.remove('ledger__row--on'));
    row.classList.add('ledger__row--on');
    this.root.querySelector('[data-detail]').replaceChildren(...this.detailParts(record));
  }

  summaryRow(record) {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'ledger__row';

    const chosen = span();
    chosen.appendChild(tileNode(record.picked.tile));

    const ideal = span();
    if (record.best.tile === record.picked.tile) {
      ideal.className = 'ledger__same';
      ideal.textContent = '=';
    } else {
      ideal.appendChild(tileNode(record.best.tile));
    }

    row.append(
      span(record.turn),
      chosen,
      ideal,
      span(STANCE_LABELS[record.stance]),
      span(record.picked.shanten),
      span(dangerText(record.stance, record.picked.danger)),
      span(record.verdict, `verdict verdict--${record.verdict}`)
    );
    return row;
  }

  detailParts(record) {
    const hand = document.createElement('div');
    hand.className = 'detail__hand';
    record.hand.forEach((tile) => hand.appendChild(tileNode(tile, { mark: this.markOf(tile, record) })));

    const compare = document.createElement('div');
    compare.className = 'compare';
    compare.append(
      this.compareRow('선택', record.picked, record.stance, 'pick'),
      this.compareRow('최선', record.best, record.stance, 'best')
    );

    return [hand, this.boardNode(record.rivers), compare];
  }

  boardNode(rivers) {
    const board = document.createElement('div');
    board.className = 'table detail__board';
    board.append(...SEAT_CLASSES.map((seatClass, seat) => {
      const frame = document.createElement('div');
      frame.className = `seat ${seatClass}`;
      const river = document.createElement('div');
      river.className = 'river';
      river.append(...riverRows(rivers[seat]));
      frame.appendChild(river);
      return frame;
    }));
    return board;
  }

  markOf(tile, record) {
    if (tile === record.picked.tile) return 'pick';
    if (tile === record.best.tile) return 'best';
    return null;
  }

  compareRow(label, stats, stance, mark) {
    const row = document.createElement('div');
    row.className = 'compare__row';
    const tile = span();
    tile.appendChild(tileNode(stats.tile, { mark }));
    row.append(
      span(label, 'compare__label'),
      tile,
      statNode('샨텐', stats.shanten),
      statNode('받음', stats.ukeire),
      statNode('위험', dangerText(stance, stats.danger))
    );
    return row;
  }
}
