import { Settings, SETTING_VALUES } from '../core/settings.js';
import { PanelView } from './panelView.js';
import { strings, LANGUAGE_NAMES } from '../i18n/index.js';

const ROWS = ['language', 'discardInput', 'tileStyle'];

function valueLabel(name, value) {
  return name === 'language' ? LANGUAGE_NAMES[value] : strings().settings.value[name][value];
}

function optionRow(name) {
  const choices = SETTING_VALUES[name].map((value) => `
    <button class="btn ${Settings.get(name) === value ? 'btn--on' : ''}" type="button"
      data-setting="${name}" data-value="${value}">${valueLabel(name, value)}</button>
  `).join('');
  return `
    <div class="option">
      <span class="option__label">${strings().settings[name]}</span>
      <div class="segment">${choices}</div>
    </div>
  `;
}

export class SettingsView extends PanelView {
  get title() {
    return strings().settings.title;
  }

  content() {
    return ROWS.map(optionRow).join('');
  }

  bind() {
    this.root.querySelectorAll('[data-setting]').forEach((node) => {
      node.addEventListener('click', () => Settings.set(node.dataset.setting, node.dataset.value));
    });
  }
}
