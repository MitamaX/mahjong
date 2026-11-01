import { anchor, div, escape, tag } from './markup.js';
import { HREF } from './linkView.js';
import { scrollFrame } from './siteView.js';
import { helpGroupHtml, linesHtml, termAnchor } from './glossary.js';

const headingHtml = (title) => tag('h2', { class: 'doc__heading' }, escape(title));

const linkListHtml = (dictionary, names) => div('lines surface',
  names.map((name) => anchor(escape(dictionary.doc.link[name]), HREF[name], 'link')));

const privacyBody = (dictionary) => dictionary.doc.privacy.sections.map(({ title, lines, links }) =>
  helpGroupHtml('section', headingHtml(title), div('stack', [
    linesHtml(dictionary, lines, 'lines surface', termAnchor),
    links && linkListHtml(dictionary, links)
  ])));

const BODIES = { privacy: privacyBody };

export const docMarkup = (dictionary, language, { place, name }) =>
  scrollFrame(dictionary, language, place, tag('main', { class: 'doc sheet' }, [
    tag('h1', { class: 'doc__title' }, escape(dictionary.doc[name].title)),
    BODIES[name](dictionary)
  ]));
