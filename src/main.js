import { Round, PLAYER } from './core/round.js';
import { Settings } from './core/settings.js';
import { pageLanguage } from './core/locale.js';
import { TableView } from './ui/tableView.js';
import { ReportView } from './ui/reportView.js';
import { LoaderView } from './ui/loaderView.js';
import { SettingsView } from './ui/settingsView.js';
import { HelpView } from './ui/helpView.js';
import { strings, titleOf } from './i18n/index.js';

const TEMPO = { auto: 40, self: 150, opponent: 280, riichi: 900, result: 1000, load: 420 };
const MAX_DEALS = 24;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function pauseFor(event) {
  if (event.type === 'result') return TEMPO.result;
  if (event.riichi) return TEMPO.riichi;
  if (event.phase === 'auto') return TEMPO.auto;
  return event.seat === PLAYER ? TEMPO.self : TEMPO.opponent;
}

class App {
  constructor(roots) {
    this.busy = false;
    this.panels = {
      help: new HelpView(roots.help),
      settings: new SettingsView(roots.settings)
    };
    this.table = new TableView(roots.table, {
      onDiscard: (tile, withRiichi) => this.discard(tile, withRiichi),
      onTool: (name) => this.panels[name].show()
    });
    this.report = new ReportView(roots.report, {
      onRestart: () => this.start()
    });
    this.loader = new LoaderView(roots.loader);
    Settings.subscribe(() => this.refresh());
    this.applyLanguage();
  }

  applyLanguage() {
    const dictionary = strings();
    document.title = titleOf(dictionary);
    document.querySelector('meta[name="description"]').content = dictionary.description;
    document.documentElement.lang = Settings.get('language');
  }

  refresh() {
    this.applyLanguage();
    Object.values(this.panels).forEach((panel) => panel.build());
    this.table.rebuild();
    this.report.rebuild();
  }

  boot() {
    Settings.set('language', pageLanguage());
    return this.start();
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
      if (event.riichi) this.table.announce(strings().riichi);
      if (event.type === 'result') this.table.announce(strings().call[event.state.result.type]);
      await wait(pauseFor(event));
    }
    this.table.render(this.round.snapshot());
    this.busy = false;
    if (this.round.result) this.report.show(this.round.report());
  }
}

const app = new App({
  table: document.querySelector('[data-table]'),
  report: document.querySelector('[data-report]'),
  loader: document.querySelector('[data-loader]'),
  settings: document.querySelector('[data-settings-panel]'),
  help: document.querySelector('[data-help-panel]')
});
app.boot();
