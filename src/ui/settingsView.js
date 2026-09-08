import { Settings, SETTING_VALUES, SETTING_DEFAULTS } from '../core/settings.js';
import { languageUrl } from '../core/locale.js';
import { PanelView, panelMarkup } from './panelView.js';
import { button, classNames, div, escape, text } from './markup.js';
import { LANGUAGE_NAMES } from '../i18n/index.js';

const ROWS = ['language', 'discardInput', 'tileStyle'];
const ACTIVE_CLASS = 'btn--on';

const valueLabel = (dictionary, name, value) =>
  (name === 'language' ? LANGUAGE_NAMES[value] : dictionary.settings.value[name][value]);

const optionRow = (dictionary, language, name) => {
  const active = name === 'language' ? language : SETTING_DEFAULTS[name];
  return div('option', [
    text(dictionary.settings[name], 'option__label'),
    div('segment', SETTING_VALUES[name].map((value) =>
      button(escape(valueLabel(dictionary, name, value)), {
        class: classNames('btn', value === active && ACTIVE_CLASS),
        'data-setting': name,
        'data-value': value
      })))
  ]);
};

export const settingsMarkup = (dictionary, language) => panelMarkup({
  modifier: 'panel--single',
  title: dictionary.settings.title,
  close: dictionary.close
}, ROWS.map((name) => optionRow(dictionary, language, name)));

export class SettingsView extends PanelView {
  constructor(root) {
    super(root);
    this.root.querySelectorAll('[data-setting]').forEach((node) => {
      node.addEventListener('click', () => this.choose(node.dataset.setting, node.dataset.value));
    });
    ROWS.forEach((name) => this.sync(name));
    Settings.subscribe((name) => this.sync(name));
  }

  sync(name) {
    this.root.querySelectorAll(`[data-setting="${name}"]`).forEach((node) => {
      node.classList.toggle(ACTIVE_CLASS, node.dataset.value === Settings.get(name));
    });
  }

  choose(name, value) {
    if (name !== 'language') return Settings.set(name, value);
    if (value !== Settings.get('language')) location.assign(languageUrl(value));
  }
}
