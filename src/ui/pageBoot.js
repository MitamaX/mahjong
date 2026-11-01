import { Settings } from '../core/settings.js';
import { pageLanguage } from '../core/locale.js';
import { Progress } from '../core/progress.js';
import { repaintTiles } from './tileView.js';
import { SettingsView } from './settingsView.js';
import { HelpView } from './helpView.js';
import { MenuView } from './menuView.js';
import { RailView } from './railView.js';
import { TermStackView } from './termStackView.js';

const STYLED_SETTING = 'tileStyle';
const DONE_CARD = 'card--done';
const PANEL_VIEWS = { help: HelpView, settings: SettingsView };

export function bootPage() {
  Settings.set('language', pageLanguage());
  repaintTiles(document);
  Settings.subscribe((name) => {
    if (name === STYLED_SETTING) repaintTiles(document);
  });
  document.querySelectorAll('[data-menu]').forEach((node) => new MenuView(node));
  document.querySelectorAll('[data-rail]').forEach((node) => new RailView(node));
  document.querySelectorAll('[data-lesson-card]').forEach((node) => {
    node.classList.toggle(DONE_CARD, Progress.has(node.dataset.lessonCard));
  });
  document.querySelectorAll('[data-term-layer]').forEach((node) => new TermStackView(node));
  Object.entries(PANEL_VIEWS).forEach(([name, View]) => {
    const panel = new View(document.querySelector(`[data-${name}-panel]`));
    document.querySelector(`[data-open-${name}]`).addEventListener('click', () => panel.show());
  });
}
