import { SETTING_VALUES } from './settings.js';

export const ZONE_LANGUAGES = { 'Asia/Seoul': 'ko', 'Asia/Tokyo': 'ja' };
export const FALLBACK_LANGUAGE = 'en';
export const SITE_ROOT = '/';

function supported(language) {
  return SETTING_VALUES.language.includes(language) ? language : null;
}

function fromDocument() {
  return supported(document.documentElement.lang);
}

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

export function pageLanguage() {
  return fromDocument() ?? fromNavigator() ?? fromZone() ?? FALLBACK_LANGUAGE;
}

export function languageUrl(language) {
  return `${SITE_ROOT}${language}/`;
}
