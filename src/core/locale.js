import { SETTING_VALUES } from './settings.js';

const ZONE_LANGUAGES = { 'Asia/Seoul': 'ko', 'Asia/Tokyo': 'ja' };
const FALLBACK = 'en';

function supported(language) {
  return SETTING_VALUES.language.includes(language) ? language : null;
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

export function guessLanguage() {
  return fromNavigator() ?? fromZone() ?? FALLBACK;
}
