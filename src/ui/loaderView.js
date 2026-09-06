import { OverlayView } from './overlayView.js';
import { tileNode } from './tileView.js';

const STRIP_SIZE = 4;

export class LoaderView extends OverlayView {
  constructor(root) {
    super(root);
    const strip = document.createElement('div');
    strip.className = 'loader';
    strip.append(...Array.from({ length: STRIP_SIZE }, () => tileNode(0, { back: true })));
    this.root.replaceChildren(strip);
  }
}
