import { tag } from './markup.js';

export const DISMISS_KEY = 'Escape';

const dialogAttributes = (label) => ({ role: 'dialog', 'aria-modal': 'true', tabindex: '-1', ...label });

export const overlayHtml = (name, content, label = null) => tag('div', {
  class: 'overlay',
  [`data-${name}`]: true,
  hidden: true,
  ...(label && dialogAttributes(label))
}, content);

export class OverlayView {
  constructor(root) {
    this.root = root;
    this.opener = null;
  }

  node(name) {
    return this.root.querySelector(`[data-${name}]`);
  }

  get visible() {
    return !this.root.hidden;
  }

  show() {
    if (this.visible) return;
    this.opener = document.activeElement;
    this.root.hidden = false;
    this.shelter(true);
    this.root.focus();
  }

  hide() {
    if (!this.visible) return;
    this.root.hidden = true;
    this.shelter(false);
    this.opener?.focus();
    this.opener = null;
  }

  shelter(inert) {
    [...document.body.children].forEach((node) => {
      if (!node.contains(this.root)) node.inert = inert;
    });
  }
}
