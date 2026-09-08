import { OverlayView } from './overlayView.js';
import { button, classNames, div, escape, tag, text } from './markup.js';

export const panelMarkup = ({ modifier, title, close }, content) =>
  div(classNames('panel', modifier), [
    tag('header', { class: 'panel__head' }, text(title, 'panel__title')),
    content,
    button(escape(close), { class: 'btn btn--accent btn--wide panel__action', 'data-close': true })
  ]);

export class PanelView extends OverlayView {
  constructor(root) {
    super(root);
    this.node('close').addEventListener('click', () => this.hide());
  }
}
