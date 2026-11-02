const DEPTH_KEY = 'backDepth';
const PRIMARY_BUTTON = 0;

const entries = [];
let departure = null;

const depthOf = (state) => state?.[DEPTH_KEY] ?? 0;

const modified = (event) => event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

const leavesPage = (event, link) => link !== null && !link.target && !modified(event)
  && event.button === PRIMARY_BUTTON
  && link.origin === location.origin
  && link.pathname !== location.pathname;

const settle = (event) => {
  const depth = depthOf(event.state);
  while (entries.length > depth) entries.pop().retreat();
  if (departure && !entries.length) location.assign(departure);
};

const depart = (event) => {
  const link = event.target.closest('a[href]');
  if (!entries.length || !leavesPage(event, link)) return;
  event.preventDefault();
  departure = link.href;
  history.go(-entries.length);
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
    addEventListener('click', depart);
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
