import { OverlayView } from './overlayView.js';
import { strings } from '../i18n/index.js';

export class PanelView extends OverlayView {
  constructor(root) {
    super(root);
    this.build();
  }

  build() {
    this.root.innerHTML = `
      <div class="panel ${this.modifier}">
        <header class="panel__head">
          <span class="panel__title">${this.title}</span>
        </header>
        ${this.content()}
        <button class="btn btn--accent btn--wide" type="button" data-close>${strings().close}</button>
      </div>
    `;
    this.bind();
    this.node('close').addEventListener('click', () => this.hide());
  }

  get modifier() {
    return 'panel--single';
  }

  bind() {}
}
