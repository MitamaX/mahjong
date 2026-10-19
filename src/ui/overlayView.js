export class OverlayView {
  constructor(root) {
    this.root = root;
  }

  node(name) {
    return this.root.querySelector(`[data-${name}]`);
  }

  get visible() {
    return !this.root.hidden;
  }

  show() {
    this.root.hidden = false;
  }

  hide() {
    this.root.hidden = true;
  }
}
