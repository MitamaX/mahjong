import { DISMISS_KEY, OverlayView, overlayHtml } from './overlayView.js';
import { button, classNames, div, escape, tag, text } from './markup.js';

export const panelMarkup = ({ name, modifier, title, close }, content) => overlayHtml(name,
  div(classNames('panel sheet', modifier), [
    tag('header', { class: 'panel__head' }, text(title, 'panel__title')),
    content,
    button(escape(close), { class: 'btn btn--accent btn--wide panel__action', 'data-close': true })
  ]),
  { 'aria-label': title });

export class PanelView extends OverlayView {
  constructor(root) {
    super(root);
    this.root.querySelectorAll('[data-close]').forEach((node) => node.addEventListener('click', () => this.hide()));
    this.root.addEventListener('click', (event) => {
      if (event.target === this.root) this.hide();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === DISMISS_KEY) this.hide();
    });
  }
}
