import { Settings } from '../core/settings.js';

const ARMED_CLASS = 'tile--armed';

export class DiscardInput {
  constructor(onDiscard) {
    this.onDiscard = onDiscard;
    this.armed = null;
    this.armedNode = null;
  }

  get mode() {
    return Settings.get('discardInput');
  }

  clear() {
    if (this.armedNode) this.armedNode.classList.remove(ARMED_CLASS);
    this.armed = null;
    this.armedNode = null;
  }

  bind(node, tile) {
    node.addEventListener('click', () => this.click(node, tile));
  }

  click(node, tile) {
    if (this.mode === 'single' || this.armed === tile) {
      this.discard(tile);
      return;
    }
    this.clear();
    this.armed = tile;
    this.armedNode = node;
    node.classList.add(ARMED_CLASS);
  }

  discard(tile) {
    this.clear();
    this.onDiscard(tile);
  }
}
