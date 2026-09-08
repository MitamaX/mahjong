export const STORAGE_KEY = 'mahjong.settings';

export const SETTING_VALUES = {
  language: ['ja', 'en', 'ko'],
  discardInput: ['single', 'double'],
  tileStyle: ['standard', 'simple', 'classic']
};

const NAMES = Object.keys(SETTING_VALUES);
export const SETTING_DEFAULTS = { language: 'ko', discardInput: 'single', tileStyle: 'standard' };

function readStored() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch (unused) {
    return {};
  }
}

function accepted(stored) {
  return Object.fromEntries(NAMES
    .filter((name) => SETTING_VALUES[name].includes(stored[name]))
    .map((name) => [name, stored[name]]));
}

class SettingsStore {
  constructor() {
    this.chosen = accepted(readStored());
    this.values = { ...SETTING_DEFAULTS, ...this.chosen };
    this.listeners = new Set();
  }

  get(name) {
    return this.values[name];
  }

  set(name, value) {
    if (!SETTING_VALUES[name].includes(value)) return;
    this.chosen[name] = value;
    if (this.values[name] === value) {
      this.persist();
      return;
    }
    this.values[name] = value;
    this.persist();
    this.listeners.forEach((listener) => listener(name));
  }

  persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.chosen));
    } catch (unused) {
      return;
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }
}

export const Settings = new SettingsStore();
