import { link, tag, text } from './markup.js';

const READING_LINE = 0.35;
const BOTTOM_SLACK = 2;
const CURRENT = 'true';

export const railHtml = (sections) => tag('nav', { class: 'rail', 'data-rail': true },
  sections.map(({ id, number, title }) =>
    link([text(number, 'rail__mark'), text(title, 'rail__label')], `#${id}`, 'rail__item', { 'data-rail-item': true })));

const atBottom = () => {
  const { scrollHeight } = document.documentElement;
  return scrollHeight > innerHeight && innerHeight + scrollY >= scrollHeight - BOTTOM_SLACK;
};

export class RailView {
  constructor(root) {
    this.items = [...root.querySelectorAll('[data-rail-item]')]
      .filter((item) => document.querySelector(item.getAttribute('href')));
    this.sections = this.items.map((item) => document.querySelector(item.getAttribute('href')));
    this.pending = false;
    addEventListener('scroll', () => this.schedule(), { passive: true });
    addEventListener('resize', () => this.schedule());
    this.sync();
  }

  get current() {
    if (atBottom()) return this.sections.length - 1;
    const line = innerHeight * READING_LINE;
    const passed = this.sections.filter((section) => section.getBoundingClientRect().top <= line).length;
    return Math.max(0, passed - 1);
  }

  schedule() {
    if (this.pending) return;
    this.pending = true;
    requestAnimationFrame(() => {
      this.pending = false;
      this.sync();
    });
  }

  sync() {
    const current = this.current;
    this.items.forEach((item, index) => { item.ariaCurrent = index === current ? CURRENT : null; });
  }
}
