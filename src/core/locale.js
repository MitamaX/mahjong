import { SETTING_VALUES } from './settings.js';

const ZONE_LANGUAGES = { 'Asia/Seoul': 'ko', 'Asia/Tokyo': 'ja' };
const FALLBACK = 'en';
const LANGUAGE_SEGMENT = new RegExp(`(?:${SETTING_VALUES.language.join('|')})/$`);

function supported(language) {
  return SETTING_VALUES.language.includes(language) ? language : null;
}

const DECLARED_LANGUAGE = supported(document.documentElement.lang);

function fromNavigator() {
  const tag = navigator.languages?.[0] ?? navigator.language ?? '';
  return supported(tag.toLowerCase().split('-')[0]);
}

function fromZone() {
  try {
    return supported(ZONE_LANGUAGES[Intl.DateTimeFormat().resolvedOptions().timeZone]);
  } catch (unused) {
    return null;
  }
}

function siteRoot() {
  return location.pathname.replace(/[^/]*$/, '').replace(LANGUAGE_SEGMENT, '');
}

export function guessLanguage() {
  return fromNavigator() ?? fromZone() ?? FALLBACK;
}

export function pageLanguage() {
  return DECLARED_LANGUAGE ?? guessLanguage();
}

export function languageUrl(language) {
  return `${siteRoot()}${language}/`;
}
