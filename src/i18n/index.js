import { Settings } from '../core/settings.js';
import { ko } from './ko.js';
import { ja } from './ja.js';
import { en } from './en.js';

export const DICTIONARIES = { ko, ja, en };

export const LANGUAGE_NAMES = { ko: '한국어', ja: '日本語', en: 'English' };

export function titleOf(dictionary) {
  return `${dictionary.brand}: ${dictionary.tagline}`;
}

export function strings() {
  return DICTIONARIES[Settings.get('language')];
}
