import { Settings } from '../core/settings.js';
import { pageLanguage } from '../core/locale.js';
import { repaintTiles } from './tileView.js';
import { SettingsView } from './settingsView.js';
import { MenuView } from './menuView.js';
import { RailView } from './railView.js';

const STYLED_SETTING = 'tileStyle';

export function bootPage() {
  Settings.set('language', pageLanguage());
  repaintTiles(document);
  Settings.subscribe((name) => {
    if (name === STYLED_SETTING) repaintTiles(document);
  });
  document.querySelectorAll('[data-menu]').forEach((node) => new MenuView(node));
  document.querySelectorAll('[data-rail]').forEach((node) => new RailView(node));
  const settings = new SettingsView(document.querySelector('[data-settings-panel]'));
  document.querySelector('[data-open-settings]').addEventListener('click', () => settings.show());
}
