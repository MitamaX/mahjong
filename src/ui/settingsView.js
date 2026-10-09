import { Settings, SETTING_VALUES, SETTING_DEFAULTS } from '../core/settings.js';
import { PanelView, panelMarkup } from './panelView.js';
import { button, classNames, div, escape, text } from './markup.js';

const ROWS = ['discardInput', 'tileStyle'];
const ACTIVE_CLASS = 'btn--on';

const optionRow = (dictionary, name) => div('option', [
  text(dictionary.settings[name], 'option__label'),
  div('segment', SETTING_VALUES[name].map((value) =>
    button(escape(dictionary.settings.value[name][value]), {
      class: classNames('btn', value === SETTING_DEFAULTS[name] && ACTIVE_CLASS),
      'data-setting': name,
      'data-value': value
    })))
]);

export const settingsMarkup = (dictionary) => panelMarkup({
  name: 'settings-panel',
  modifier: 'panel--single',
  title: dictionary.settings.title,
  close: dictionary.close
}, ROWS.map((name) => optionRow(dictionary, name)));

export class SettingsView extends PanelView {
  constructor(root) {
    super(root);
    this.root.querySelectorAll('[data-setting]').forEach((node) => {
      node.addEventListener('click', () => Settings.set(node.dataset.setting, node.dataset.value));
    });
    ROWS.forEach((name) => this.sync(name));
    Settings.subscribe((name) => this.sync(name));
  }

  sync(name) {
    this.root.querySelectorAll(`[data-setting="${name}"]`).forEach((node) => {
      node.classList.toggle(ACTIVE_CLASS, node.dataset.value === Settings.get(name));
    });
  }
}
