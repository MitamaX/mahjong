import { DISMISS_KEY } from './overlayView.js';

export class MenuView {
  constructor(root) {
    this.root = root;
    this.toggle = root.querySelector('summary');
    document.addEventListener('click', (event) => {
      if (!root.contains(event.target)) this.close();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === DISMISS_KEY) this.close();
    });
  }

  close() {
    if (!this.root.open) return;
    const focused = this.root.contains(document.activeElement);
    this.root.open = false;
    if (focused) this.toggle.focus();
  }
}
