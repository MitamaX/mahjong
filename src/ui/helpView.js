import { DOC_PAGES } from '../core/locale.js';
import { PanelView, panelMarkup } from './panelView.js';
import { anchor, button, classNames, div, escape, link, tag, text } from './markup.js';
import { iconSvg } from './iconView.js';
import { HREF, INFO_ROWS, REPOSITORY } from './linkView.js';
import {
  PANEL_CASES,
  articleBodyHtml,
  glossaryIndexHtml,
  guardCaseHtml,
  linesHtml,
  sectionHtml,
  termButton,
  termIds,
  termOf
} from './glossary.js';

const BACK = '←';
const TABS = ['basic', 'defense', 'terms', 'info'];
const TEXT_SECTIONS = ['control', 'flow'];
const STACK_CLASS = 'help__stack';
const ACTIVE_CLASS = 'btn--on';
const [GUIDE_PAGE] = DOC_PAGES;
const docPath = (name) => `${name}/`;

const articleHtml = (dictionary, id) => tag('div', { class: 'article surface', 'data-article': id, hidden: true }, [
  div('row', [
    button(BACK, { class: 'link', 'data-back': true }),
    text(termOf(dictionary, id).name, 'article__title')
  ]),
  articleBodyHtml(dictionary, id, termButton)
]);

const basicPane = (dictionary) => [
  text(dictionary.help.name, 'help__name'),
  linesHtml(dictionary, dictionary.help.intro, 'lines', termButton),
  TEXT_SECTIONS.map((name) => sectionHtml(dictionary.help[name].title,
    linesHtml(dictionary, dictionary.help[name].lines, 'lines surface', termButton)))
];

const guideLinkHtml = (dictionary) => div('split split--center', [
  text(dictionary.help.guide),
  link(escape(dictionary.doc[GUIDE_PAGE].nav), docPath(GUIDE_PAGE), 'btn btn--wide')
]);

const defensePane = (dictionary) => div('guide', [
  guideLinkHtml(dictionary),
  PANEL_CASES.map((id) => guardCaseHtml(dictionary, id, termButton))
]);

const termsPane = (dictionary) => [
  tag('div', { class: STACK_CLASS, 'data-glossary': true }, glossaryIndexHtml(dictionary, termButton)),
  termIds(dictionary).map((id) => articleHtml(dictionary, id))
];

const infoPane = (dictionary) => [
  text(dictionary.help.name, 'help__name'),
  anchor([iconSvg('github'), escape(REPOSITORY.label)], REPOSITORY.href, 'btn btn--wide btn--brand'),
  div('split', [
    div('info surface', INFO_ROWS.map(({ name, label }) => div('option', [
      text(dictionary.help.info[name], 'option__label'),
      anchor(escape(label), HREF[name], 'link')
    ]))),
    div('stack', DOC_PAGES.map((name) =>
      link(escape(dictionary.doc[name].nav), docPath(name), 'btn btn--wide')))
  ])
];

const PANES = { basic: basicPane, defense: defensePane, terms: termsPane, info: infoPane };

const paneHtml = (dictionary, name) => tag('div', {
  class: STACK_CLASS,
  'data-pane': name,
  hidden: name !== TABS[0]
}, PANES[name](dictionary));

const tabHtml = (dictionary, name) => button(escape(dictionary.help.tab[name]), {
  class: classNames('btn', name === TABS[0] && ACTIVE_CLASS),
  'data-tab': name
});

export const helpMarkup = (dictionary) => panelMarkup({
  modifier: 'panel--help',
  title: dictionary.help.title,
  close: dictionary.close
}, [
  tag('div', { class: 'segment segment--wide' }, TABS.map((name) => tabHtml(dictionary, name))),
  tag('div', { class: 'help', 'data-help-body': true }, TABS.map((name) => paneHtml(dictionary, name)))
]);

export class HelpView extends PanelView {
  constructor(root) {
    super(root);
    this.tab = TABS[0];
    this.article = null;
    this.trail = [];
    this.body = this.node('help-body');
    this.root.addEventListener('click', (event) => this.dispatch(event.target.closest('[data-tab], [data-term], [data-back]')));
  }

  dispatch(node) {
    if (!node) return;
    if (node.dataset.tab) return this.openTab(node.dataset.tab);
    if (node.dataset.term) return this.openTerm(node.dataset.term);
    return this.back();
  }

  openTab(name) {
    this.tab = name;
    this.article = null;
    this.trail = [];
    this.render();
  }

  openTerm(id) {
    this.trail.push({ tab: this.tab, article: this.article, scroll: this.body.scrollTop });
    this.tab = 'terms';
    this.article = id;
    this.render();
  }

  back() {
    const spot = this.trail.pop();
    if (!spot) return;
    this.tab = spot.tab;
    this.article = spot.article;
    this.render(spot.scroll);
  }

  render(scroll = 0) {
    this.root.querySelectorAll('[data-tab]').forEach((node) => {
      node.classList.toggle(ACTIVE_CLASS, node.dataset.tab === this.tab);
    });
    this.root.querySelectorAll('[data-pane]').forEach((node) => {
      node.hidden = node.dataset.pane !== this.tab;
    });
    this.node('glossary').hidden = this.article !== null;
    this.root.querySelectorAll('[data-article]').forEach((node) => {
      node.hidden = node.dataset.article !== this.article;
    });
    this.body.scrollTop = scroll;
  }
}
