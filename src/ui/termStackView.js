import { BackTrail } from './backTrail.js';

const HASH_LINK = 'a[href^="#"]';
const CLOSE = '[data-close]';
const OPEN = 'data-open';
const DEPTH = '--term-depth';
const COVER = '--term-cover';

export class TermStackView {
  constructor(layer) {
    this.layer = layer;
    this.cards = new Map([...layer.children].map((card) => [`#${card.id}`, card]));
    this.stack = [];
    this.backTrail = new BackTrail(() => this.lower());
    document.addEventListener('click', (event) => this.dispatch(event));
    this.restore();
  }

  get top() {
    return this.stack.at(-1);
  }

  restore() {
    const card = this.cards.get(location.hash);
    if (!card) return;
    history.replaceState(history.state, '', `${location.pathname}${location.search}`);
    this.show([card]);
  }

  dispatch(event) {
    const inCard = this.layer.contains(event.target);
    if (inCard && event.target.closest(CLOSE)) return this.lower();
    const card = this.cards.get(event.target.closest(HASH_LINK)?.hash);
    if (!card) return;
    event.preventDefault();
    this.show(inCard ? this.raised(card) : [card]);
  }

  lower() {
    this.show(this.stack.slice(0, -1));
  }

  raised(card) {
    const depth = this.stack.indexOf(card);
    return depth < 0 ? [...this.stack, card] : this.stack.slice(0, depth + 1);
  }

  show(stack) {
    this.stack = stack;
    stack.forEach((card, depth) => {
      card.style.setProperty(DEPTH, depth);
      card.style.setProperty(COVER, stack.length - 1 - depth);
    });
    this.cards.forEach((card) => {
      card.toggleAttribute(OPEN, stack.includes(card));
      [...card.children].forEach((part) => { part.inert = card !== this.top; });
    });
    this.backTrail.sync(stack.length);
  }
}
