import { Round, PLAYER } from './core/round.js';
import { TableView } from './ui/tableView.js';
import { ReportView } from './ui/reportView.js';
import { LoaderView } from './ui/loaderView.js';

const TEMPO = { auto: 40, self: 150, opponent: 280, riichi: 900, result: 1000, load: 420 };
const MAX_DEALS = 24;
const CALLS = { ron: '론', tsumo: '쯔모', draw: '유국' };

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function pauseFor(event) {
  if (event.type === 'result') return TEMPO.result;
  if (event.riichi) return TEMPO.riichi;
  if (event.phase === 'auto') return TEMPO.auto;
  return event.seat === PLAYER ? TEMPO.self : TEMPO.opponent;
}

class App {
  constructor(tableRoot, reportRoot, loaderRoot) {
    this.busy = false;
    this.table = new TableView(tableRoot, {
      onDiscard: (tile, withRiichi) => this.discard(tile, withRiichi)
    });
    this.report = new ReportView(reportRoot, {
      onRestart: () => this.start()
    });
    this.loader = new LoaderView(loaderRoot);
  }

  async start() {
    if (this.busy) return;
    this.busy = true;
    this.report.hide();
    this.loader.show();
    const [events] = await Promise.all([this.dealUntilDefense(), wait(TEMPO.load)]);
    this.loader.hide();
    this.busy = false;
    return this.play(events);
  }

  async dealUntilDefense() {
    let events = [];
    for (let attempt = 0; attempt < MAX_DEALS; attempt += 1) {
      await wait(0);
      this.round = new Round(Math.floor(Math.random() * 0xFFFFFFFF));
      events = this.round.start();
      if (this.round.isDefenseScenario()) break;
    }
    return events;
  }

  discard(tile, withRiichi) {
    if (this.busy) return;
    return this.play(this.round.playerDiscard(tile, withRiichi));
  }

  async play(events) {
    this.busy = true;
    for (const event of events) {
      this.table.render(event.state);
      if (event.riichi) this.table.announce('리치');
      if (event.type === 'result') this.table.announce(CALLS[event.state.result.type]);
      await wait(pauseFor(event));
    }
    this.table.render(this.round.snapshot());
    this.busy = false;
    if (this.round.result) this.report.show(this.round.report());
  }
}

const app = new App(
  document.querySelector('[data-table]'),
  document.querySelector('[data-report]'),
  document.querySelector('[data-loader]')
);
app.start();
