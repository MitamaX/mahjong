import { DOC_PAGES, GUIDE_PAGE, HOME_PAGE } from '../core/locale.js';
import { PanelView, panelMarkup } from './panelView.js';
import { anchor, button, classNames, div, escape, tag, text } from './markup.js';
import { iconSvg } from './iconView.js';
import { REPOSITORY } from './linkView.js';
import { infoRowsHtml, pageLink } from './siteView.js';
import {
  CASE_FIGURE_STYLE,
  PANEL_CASES,
  TERM_FIGURE_STYLE,
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
const INFO_PAGES = [HOME_PAGE, ...DOC_PAGES];

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

const guideLinkHtml = (dictionary, language) => div('split split--center', [
  text(dictionary.help.guide),
  pageLink(dictionary, language, GUIDE_PAGE, 'btn btn--wide')
]);

const defensePane = (dictionary, language) => div('guide', [
  guideLinkHtml(dictionary, language),
  PANEL_CASES.map((id) => guardCaseHtml(dictionary, id, termButton))
]);

const termsPane = (dictionary) => [
  tag('div', { class: STACK_CLASS, 'data-glossary': true }, glossaryIndexHtml(dictionary, termButton)),
  termIds(dictionary).map((id) => articleHtml(dictionary, id))
];

const infoPane = (dictionary, language) => [
  text(dictionary.help.name, 'help__name'),
  anchor([iconSvg('github'), escape(REPOSITORY.label)], REPOSITORY.href, 'btn btn--wide btn--brand'),
  div('split', [
    div('info surface', infoRowsHtml(dictionary, 'link')),
    div('stack', INFO_PAGES.map((name) => pageLink(dictionary, language, name, 'btn btn--wide')))
  ])
];

const PANES = { basic: basicPane, defense: defensePane, terms: termsPane, info: infoPane };
const PANE_STYLES = { defense: CASE_FIGURE_STYLE, terms: TERM_FIGURE_STYLE };

const paneHtml = (dictionary, language, name) => tag('div', {
  class: STACK_CLASS,
  'data-pane': name,
  style: PANE_STYLES[name],
  hidden: name !== TABS[0]
}, PANES[name](dictionary, language));

const tabHtml = (dictionary, name) => button(escape(dictionary.help.tab[name]), {
  class: classNames('btn', name === TABS[0] && ACTIVE_CLASS),
  'data-tab': name
});

export const helpMarkup = (dictionary, language) => panelMarkup({
  name: 'help-panel',
  modifier: 'panel--help',
  title: dictionary.help.title,
  close: dictionary.close
}, [
  tag('div', { class: 'segment segment--wide' }, TABS.map((name) => tabHtml(dictionary, name))),
  tag('div', { class: 'help', 'data-help-body': true }, TABS.map((name) => paneHtml(dictionary, language, name)))
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
