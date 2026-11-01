import { SETTING_VALUES } from '../core/settings.js';
import { GUIDE_PAGE, HOME_KIND, HOME_PAGE, PRACTICE_PAGE, PRIVACY_PAGE, pageKind, pageUrl } from '../core/locale.js';
import { LANGUAGE_NAMES } from '../i18n/index.js';
import { iconSvg } from './iconView.js';
import { HREF, INFO_ROWS, REPOSITORY } from './linkView.js';
import { anchor, button, div, escape, link, tag, text } from './markup.js';

const BAR_CONTROL = 'btn btn--quiet';
const FOOT_LINK = 'site-foot__link';

export const SITE_PAGES = {
  [HOME_PAGE]: { kind: HOME_KIND, label: (dictionary) => dictionary.doc.home },
  [PRACTICE_PAGE]: { kind: pageKind(PRACTICE_PAGE), label: (dictionary) => dictionary.course.practice },
  [GUIDE_PAGE]: { kind: pageKind(GUIDE_PAGE), label: (dictionary) => dictionary.doc[GUIDE_PAGE].nav },
  [PRIVACY_PAGE]: { kind: pageKind(PRIVACY_PAGE), label: (dictionary) => dictionary.doc[PRIVACY_PAGE].nav }
};

const BAR_PAGES = [HOME_PAGE, PRACTICE_PAGE, GUIDE_PAGE];
const FOOT_PAGES = Object.keys(SITE_PAGES);

export const pageLink = (dictionary, language, name, className, attrs) =>
  link(escape(SITE_PAGES[name].label(dictionary)), pageUrl(language, SITE_PAGES[name].kind), className, attrs);

const navLink = (dictionary, language, place, className) => (name) =>
  pageLink(dictionary, language, name, className, { 'aria-current': name === place.section && 'page' });

export const infoRowsHtml = (dictionary, linkClass) => INFO_ROWS.map(({ name, label }) => div('option', [
  text(dictionary.help.info[name], 'option__label'),
  anchor(escape(label), HREF[name], linkClass)
]));

const brandHtml = (dictionary, language) => link(escape(dictionary.brand), pageUrl(language), 'brand');

const languageOption = (language, place) => (code) => {
  const label = [escape(LANGUAGE_NAMES[code]), code === language && iconSvg('check')];
  const attrs = { lang: code, 'aria-current': code === language && 'true' };
  return place.languages.includes(code)
    ? link(label, pageUrl(code, place.kind), 'menu__item', { ...attrs, hreflang: code })
    : tag('span', { class: 'menu__item', 'aria-disabled': 'true', ...attrs }, label);
};

const languageMenuHtml = (language, place) => tag('details', { class: 'menu', 'data-menu': true }, [
  tag('summary', { class: `${BAR_CONTROL} menu__toggle` }, [escape(LANGUAGE_NAMES[language]), iconSvg('chevron')]),
  div('menu__list', SETTING_VALUES.language.map(languageOption(language, place)))
]);

const settingsButtonHtml = (dictionary) => button(iconSvg('settings'), {
  class: `${BAR_CONTROL} btn--icon`,
  'aria-label': dictionary.settings.title,
  'data-open-settings': true
});

const siteBarHtml = (dictionary, language, place) => tag('header', { class: 'site-bar' }, [
  brandHtml(dictionary, language),
  tag('nav', { class: 'segment site-bar__nav' }, BAR_PAGES.map(navLink(dictionary, language, place, BAR_CONTROL))),
  div('site-bar__tools', [languageMenuHtml(language, place), settingsButtonHtml(dictionary)])
]);

const footGroupHtml = (title, items) => div('site-foot__group', [text(title, 'site-foot__title'), items]);

const siteFootHtml = (dictionary, language, place) => tag('footer', { class: 'site-foot' },
  div('site-foot__inner', [
    div('site-foot__group site-foot__lead', [brandHtml(dictionary, language), text(dictionary.tagline, 'caption')]),
    footGroupHtml(dictionary.doc.pages,
      tag('nav', { class: 'stack' }, FOOT_PAGES.map(navLink(dictionary, language, place, FOOT_LINK)))),
    footGroupHtml(dictionary.help.tab.info, [
      anchor([iconSvg('github'), escape(REPOSITORY.label)], REPOSITORY.href, FOOT_LINK),
      div('site-foot__rows', infoRowsHtml(dictionary, FOOT_LINK))
    ])
  ]));

export const screenFrame = (dictionary, language, place, content) =>
  div('screen', [siteBarHtml(dictionary, language, place), content]);

export const scrollFrame = (dictionary, language, place, content) => [
  siteBarHtml(dictionary, language, place),
  content,
  siteFootHtml(dictionary, language, place)
];
