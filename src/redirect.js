import { Settings } from './core/settings.js';
import { guessLanguage, languageUrl } from './core/locale.js';

const language = Settings.isDefault('language') ? guessLanguage() : Settings.get('language');

location.replace(languageUrl(language));
