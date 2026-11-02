const DEPTH_KEY = 'backDepth';

const entries = [];

const depthOf = (state) => state?.[DEPTH_KEY] ?? 0;

const settle = (event) => {
  const depth = depthOf(event.state);
  while (entries.length > depth) entries.pop().retreat();
};

const push = (trail) => {
  entries.push(trail);
  history.pushState({ [DEPTH_KEY]: entries.length }, '');
};

const drop = (count) => {
  entries.length -= count;
  history.go(-count);
};

export class BackTrail {
  constructor(onBack) {
    this.onBack = onBack;
    this.depth = 0;
    addEventListener('popstate', settle);
  }

  sync(depth) {
    const rise = depth - this.depth;
    this.depth = depth;
    for (let step = 0; step < rise; step += 1) push(this);
    if (rise < 0) drop(-rise);
  }

  retreat() {
    this.depth -= 1;
    this.onBack();
  }
}
