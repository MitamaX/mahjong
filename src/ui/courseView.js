import { HOME_PAGE, LESSON_DIR, pageKind, pageUrl } from '../core/locale.js';
import { LESSONS, UNITS, lessonAfter } from '../lessons/catalog.js';
import { div, escape, link, outlineNumber, tag, text } from './markup.js';
import { SITE_PAGES, screenFrame, scrollFrame } from './siteView.js';
import { figureHtml, figureStyle } from './figureView.js';
import { iconSvg } from './iconView.js';
import { completionHtml, lessonMarkup } from './lessonView.js';
import { railHtml } from './railView.js';
import { termLayerHtml } from './glossary.js';

const COVER_STYLE = figureStyle(...LESSONS.map((lesson) => lesson.cover));
const CARD_CAPTION = 'caption caption--large';

export const lessonKind = (lesson) => pageKind(LESSON_DIR, lesson.id);

const chapterTitle = (copy, unit) => `${outlineNumber(UNITS.indexOf(unit))}. ${copy.units[unit.id]}`;

const chapterUrl = (language, unit) => `${pageUrl(language)}#${unit.id}`;

const lessonCardHtml = (language, copy, unitIndex) => (lesson, order) => link([
  figureHtml(lesson.cover, { class: 'cover', style: COVER_STYLE }),
  div('card__check', iconSvg('check')),
  div('stack card__info', [
    text(outlineNumber(unitIndex, order), CARD_CAPTION),
    text(copy.lessons[lesson.id].title, 'card__title'),
    text(copy.lessons[lesson.id].summary, CARD_CAPTION)
  ])
], pageUrl(language, lessonKind(lesson)), 'card', { 'data-lesson-card': lesson.id });

const chapterHtml = (language, copy) => (unit, index) => tag('section', { class: 'sheet chapter', id: unit.id }, [
  tag('header', { class: 'chapter__head' }, [
    text(outlineNumber(index), 'chapter__number'),
    tag('h2', { class: 'doc__heading' }, escape(copy.units[unit.id]))
  ]),
  div('cards', unit.lessons.map(lessonCardHtml(language, copy, index)))
]);

const chapterRail = (copy) =>
  railHtml(UNITS.map((unit, index) => ({ id: unit.id, number: outlineNumber(index), title: copy.units[unit.id] })));

export const courseMarkup = (dictionary, language, { place, copy }) =>
  scrollFrame(dictionary, language, place, [
    tag('main', { class: 'course' }, [
      tag('h1', { class: 'doc__title course__title' }, escape(dictionary.course.title)),
      UNITS.map(chapterHtml(language, copy))
    ]),
    chapterRail(copy)
  ]);

function finishOf(dictionary, language, lesson) {
  const next = lessonAfter(lesson);
  return next
    ? { label: dictionary.lesson.nextLesson, href: pageUrl(language, lessonKind(next)) }
    : { label: SITE_PAGES[HOME_PAGE].label(dictionary), href: pageUrl(language, SITE_PAGES[HOME_PAGE].kind) };
}

export const lessonPageMarkup = (dictionary, language, { place, unit, lesson, copy }) => {
  const lessonCopy = copy.lessons[lesson.id];
  const title = `${outlineNumber(UNITS.indexOf(unit), unit.lessons.indexOf(lesson))} ${lessonCopy.title}`;
  return [
    screenFrame(dictionary, language, place, lessonMarkup(dictionary, {
      lesson,
      copy: lessonCopy,
      title,
      names: { labels: copy.labels, honors: copy.honors, suits: copy.suits },
      chapter: { label: chapterTitle(copy, unit), href: chapterUrl(language, unit) }
    })),
    completionHtml(dictionary, title, finishOf(dictionary, language, lesson)),
    termLayerHtml(dictionary)
  ];
};
