export class AdView {
  constructor(rails) {
    this.pending = [...rails];
  }

  place() {
    this.pending.forEach((rail) => this.mount(rail));
    this.pending = [];
  }

  mount(rail) {
    const unit = document.createElement('ins');
    unit.className = 'adsbygoogle ad__unit';
    unit.dataset.adClient = rail.dataset.adClient;
    unit.dataset.adSlot = rail.dataset.adSlot;
    rail.replaceChildren(unit);
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }
}
