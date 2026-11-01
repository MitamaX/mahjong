import { SETTING_VALUES } from './settings.js';

export const ZONE_LANGUAGES = { 'Asia/Seoul': 'ko', 'Asia/Tokyo': 'ja' };
export const FALLBACK_LANGUAGE = 'en';
export const SITE_ROOT = '/';
export const GUIDE_PAGE = 'guide';
export const PRIVACY_PAGE = 'privacy';
export const DOC_PAGES = [GUIDE_PAGE, PRIVACY_PAGE];
export const HOME_PAGE = 'home';
export const PRACTICE_PAGE = 'practice';
export const LESSON_DIR = 'lessons';
export const HOME_KIND = '';

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

export const pageKind = (...segments) => segments.map((segment) => `${segment}/`).join('');

export const pageUrl = (language, kind = HOME_KIND) => `${SITE_ROOT}${language}/${kind}`;
