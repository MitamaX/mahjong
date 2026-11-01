import { TableView, tableMarkup } from './tableView.js';
import { CalloutView } from './calloutView.js';
import { PanelView } from './panelView.js';
import { overlayHtml } from './overlayView.js';
import { figureHtml, figureStyle } from './figureView.js';
import { MARK } from './tileView.js';
import { iconSvg } from './iconView.js';
import { captionOf, lineHtml, termAnchor, termLayerHtml, termOf } from './glossary.js';
import { button, classNames, div, escape, link, tag, text } from './markup.js';
import { UNLISTED, VERDICT } from '../core/lesson.js';
import { Notation } from '../core/notation.js';
import { KINDS, Tiles } from '../core/tiles.js';

const SHAKE_CLASS = 'tile--shake';
const CURRENT_CLASS = 'beat--on';
const DIM_CLASS = 'figure__group--dim';
const FIGURE_SCENE = 'lesson__stage--figure';
const STAGE_TERM_LAYER = 'term-layer--stage';
const SCROLLED_BODY = 'lesson__body--scrolled';
const PROGRESS = '--progress';
const VERDICTS = {
  [VERDICT.CORRECT]: 'verdict--best',
  [VERDICT.SECOND]: 'verdict--second',
  [VERDICT.WRONG]: 'verdict--worst'
};
const TILE_SLOT = '{tile}';
const PICKED_SLOT = '<span data-picked></span>';

const markedWith = (scene, tile, mark) => new Map(scene.marks).set(tile, mark);

const tileNameOf = (dictionary, { honors }, tile) => (Tiles.isHonor(tile)
  ? honors[Tiles.rankOf(tile) - 1]
  : `${Tiles.rankOf(tile)}${termOf(dictionary, Tiles.suitName(tile)).name}`);

const tileNamesOf = (dictionary, names) =>
  Array.from({ length: KINDS }, (unused, tile) => tileNameOf(dictionary, names, tile));

const sceneCaptionOf = (dictionary, names) => captionOf(dictionary, (key) => {
  const tile = Notation.tile(key);
  return names.labels[key] ?? (tile === null ? null : tileNameOf(dictionary, names, tile));
});

const sceneFigureHtml = (dictionary, names) => (figure, index) => figureHtml(figure, {
  class: 'figure sheet',
  'data-figure': index,
  style: figureStyle(figure),
  hidden: true
}, sceneCaptionOf(dictionary, names));

const noteHtml = (dictionary, line, attributes) => tag('p', { class: 'feedback__note', ...attributes, hidden: true },
  lineHtml(dictionary, line, termAnchor).replace(TILE_SLOT, PICKED_SLOT));

const feedbackHtml = (dictionary, copy, { id, answer }, index) => tag('div', { class: 'feedback', 'data-feedback': index, hidden: true }, [
  Object.entries(VERDICTS).map(([verdict, modifier]) =>
    tag('span', { class: `verdict ${modifier}`, 'data-verdict': verdict, hidden: true },
      escape(dictionary.lesson[verdict]))),
  Object.entries({ [UNLISTED]: dictionary.lesson.picked, ...copy.notes?.[id] })
    .filter(([key]) => answer.noteKeys.has(key))
    .map(([key, line]) => noteHtml(dictionary, line, { 'data-note': key })),
  Object.entries(copy.outranked ?? {}).map(([verdict, line]) =>
    noteHtml(dictionary, line, { 'data-outranked': verdict }))
]);

const beatHtml = (dictionary, copy) => ({ beat, index }) => [
  tag('p', { class: classNames('beat', index === 0 && CURRENT_CLASS), 'data-beat': index, hidden: index > 0 },
    lineHtml(dictionary, copy.beats[beat.id], termAnchor)),
  beat.asks && feedbackHtml(dictionary, copy, beat, index)
];

const pageHtml = (dictionary, copy, beats) => (unused, page) => tag('section', {
  class: 'lesson__page',
  'data-page': page,
  hidden: page > 0
}, beats
  .map((beat, index) => ({ beat, index }))
  .filter(({ beat }) => beat.page === page)
  .map(beatHtml(dictionary, copy)));

export const completionHtml = (dictionary, title, finish) => overlayHtml('complete',
  div('panel sheet panel--single panel--dialog', [
    div('medal', iconSvg('check')),
    div('stack', [
      text(dictionary.lesson.complete, 'panel__title'),
      text(title, 'caption')
    ]),
    div('segment', [
      button(escape(dictionary.close), { class: 'btn btn--wide', 'data-close': true }),
      link(escape(finish.label), finish.href, 'btn btn--accent btn--wide')
    ])
  ]),
  { 'aria-label': dictionary.lesson.complete });

export const lessonMarkup = (dictionary, { lesson, copy, title, names, chapter }) => tag('main', {
  class: 'lesson screen__body',
  'data-lesson': lesson.id,
  'data-tile-names': JSON.stringify(tileNamesOf(dictionary, names))
}, [
  tag('section', { class: 'stage lesson__stage sheet', 'data-scene': true }, [
    tag('div', { class: 'app', 'data-table': true }, tableMarkup(dictionary, { tools: false })),
    div('lesson__figures', lesson.figures.map(sceneFigureHtml(dictionary, names))),
    tag('svg', { class: 'callout', 'data-callout': true, 'aria-hidden': 'true', hidden: true }),
    termLayerHtml(dictionary, STAGE_TERM_LAYER)
  ]),
  div('lesson__panel sheet', [
    tag('header', { class: 'stack lesson__head' }, [
      link(escape(chapter.label), chapter.href, 'caption caption--large'),
      tag('h1', { class: 'panel__title' }, escape(title))
    ]),
    tag('div', {
      class: 'progress',
      role: 'progressbar',
      'aria-valuemin': 0,
      'aria-valuemax': lesson.beats.length,
      'data-progress': true
    }, div('progress__fill')),
    tag('div', { class: 'lesson__body', 'aria-live': 'polite', 'data-body': true },
      lesson.pages.map(pageHtml(dictionary, copy, lesson.beats))),
    div('segment', [
      button(escape(dictionary.lesson.back), { class: 'btn btn--wide', 'data-back': true }),
      button(escape(dictionary.lesson.next), { class: 'btn btn--accent btn--wide', 'data-next': true })
    ])
  ])
]);

const restart = (node) => {
  node.hidden = true;
  void node.offsetWidth;
  node.hidden = false;
};

export class LessonPlayer {
  constructor(root, lesson) {
    this.root = root;
    this.tileNames = JSON.parse(root.dataset.tileNames);
    this.lesson = lesson;
    this.solved = new Map();
    this.stage = this.node('scene');
    this.body = this.node('body');
    this.figures = [...root.querySelectorAll('[data-figure]')];
    this.pages = [...root.querySelectorAll('[data-page]')];
    this.lines = [...root.querySelectorAll('[data-beat]')];
    this.table = new TableView(this.node('table'), {
      onDiscard: (tile) => this.discard(tile),
      nameOf: (tile) => this.tileNames[tile],
      dimIdle: false
    });
    this.callout = new CalloutView(this.node('callout'), this.stage);
    this.completion = new PanelView(document.querySelector('[data-complete]'));
    this.node('back').addEventListener('click', () => this.show(this.index - 1));
    this.node('next').addEventListener('click', () => this.advance());
    this.body.addEventListener('scroll', () => this.markScroll(), { passive: true });
  }

  node(name) {
    return this.root.querySelector(`[data-${name}]`);
  }

  get beat() {
    return this.lesson.beats[this.index];
  }

  get cleared() {
    return !this.beat.asks || this.solved.has(this.index);
  }

  get onLastBeat() {
    return this.index === this.lines.length - 1;
  }

  advance() {
    if (this.onLastBeat) this.completion.show();
    else this.show(this.index + 1);
  }

  show(index) {
    this.index = index;
    this.position = this.beat.position;
    this.writeText();
    const solvedTile = this.solved.get(index);
    if (solvedTile === undefined) this.stageScene(this.beat.scene, this.beat.asks);
    else this.revisit(solvedTile);
    this.sync();
  }

  revisit(tile) {
    this.judged(VERDICT.CORRECT, this.beat.answer.judge(tile).key, tile);
    this.stageSolved(tile);
  }

  writeText() {
    const { page } = this.beat;
    this.pages.forEach((node, order) => { node.hidden = order !== page; });
    this.lines.forEach((node, order) => {
      node.hidden = this.lesson.beats[order].page !== page || order > this.index;
      node.classList.toggle(CURRENT_CLASS, order === this.index);
    });
    this.root.querySelectorAll('[data-feedback]').forEach((node) => { node.hidden = true; });
    this.reveal(this.lines[this.index]);
  }

  reveal(node) {
    this.body.scrollTop = Math.max(0, node.offsetTop + node.offsetHeight - this.body.clientHeight);
    this.markScroll();
  }

  markScroll() {
    this.body.classList.toggle(SCROLLED_BODY, this.body.scrollTop > 0);
  }

  stageScene(scene, awaiting, marks = scene.marks) {
    this.table.render({ ...this.position.snapshot(awaiting), marks, blocks: scene.blocks });
    this.showFigure(scene);
    this.callout.point(this.regionsOf(scene.callout), this.regionsOf(scene.cycle));
  }

  regionsOf(targets) {
    return targets.map((target) => this.table.region(target));
  }

  showFigure({ figure, focus }) {
    this.stage.classList.toggle(FIGURE_SCENE, figure !== null);
    this.figures.forEach((node, index) => { node.hidden = index !== figure; });
    if (figure === null) return;
    this.figures[figure].querySelectorAll('[data-group]').forEach((node) => {
      node.classList.toggle(DIM_CLASS, focus.length > 0 && !focus.includes(node.dataset.group));
    });
  }

  discard(tile) {
    const { verdict, key } = this.beat.answer.judge(tile);
    this.judged(verdict, key, tile);
    if (verdict === VERDICT.CORRECT) this.solve(tile);
    else this.miss(tile, verdict);
  }

  solve(tile) {
    this.solved.set(this.index, tile);
    this.stageSolved(tile);
    this.sync();
    this.node('next').focus();
  }

  miss(tile, verdict) {
    this.stageScene(this.beat.scene, true, markedWith(this.beat.scene, tile, MARK.PICK));
    const node = this.table.handTile(tile);
    if (verdict === VERDICT.WRONG) node?.classList.add(SHAKE_CLASS);
    node?.focus();
  }

  stageSolved(tile) {
    const solvedScene = this.beat.solvedSceneOf(tile);
    if (this.beat.chosen) {
      this.stageScene(solvedScene, false, markedWith(solvedScene, tile, MARK.BEST));
      return;
    }
    this.position = this.position.discarded(tile);
    this.stageScene(solvedScene, false);
  }

  judged(verdict, key, tile) {
    const feedback = this.node(`feedback="${this.index}"`);
    feedback.dataset.verdict = verdict;
    feedback.querySelectorAll('[data-verdict]').forEach((node) => { node.hidden = node.dataset.verdict !== verdict; });
    feedback.querySelectorAll('[data-note]').forEach((node) => { node.hidden = node.dataset.note !== key; });
    feedback.querySelectorAll('[data-outranked]').forEach((node) => { node.hidden = node.dataset.outranked !== verdict; });
    feedback.querySelectorAll('[data-picked]').forEach((node) => { node.textContent = this.tileNames[tile]; });
    restart(feedback);
    this.reveal(feedback);
  }

  sync() {
    const next = this.node('next');
    const passing = document.activeElement === next;
    const progress = this.node('progress');
    const done = this.index + Number(this.cleared);
    this.node('back').disabled = this.index === 0;
    next.disabled = !this.cleared;
    if (passing && next.disabled) this.table.firstChoice?.focus();
    progress.style.setProperty(PROGRESS, done / this.lines.length);
    progress.ariaValueNow = done;
  }
}
