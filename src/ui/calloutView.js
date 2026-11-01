import { html } from './markup.js';

const PAD = 8;
const RING_GAP = 6;
const AXES = [['x', 'width'], ['y', 'height']];
const RADIUS = 14;
const STAGE_RADIUS = 18;
const POINTER = { gap: 12, length: 58, head: 18, spread: 0.6 };
const FALLBACK = { x: 0.6, y: -0.8 };
const CYCLE_TRIM = 0.2;
const CENTER_ZONE = 0.15;
const ENTER_CLASS = 'callout--enter';
const PRECISION = 1;

const at = ({ x, y }) => `${x.toFixed(PRECISION)} ${y.toFixed(PRECISION)}`;

const shifted = (origin, direction, distance) =>
  ({ x: origin.x + direction.x * distance, y: origin.y + direction.y * distance });

const centerOf = ({ x, y, width, height }) => ({ x: x + width / 2, y: y + height / 2 });

const gapOf = (from, to) => Math.hypot(to.x - from.x, to.y - from.y);

const toward = (from, to) => {
  const length = gapOf(from, to);
  return { x: (to.x - from.x) / length, y: (to.y - from.y) / length };
};

const blend = (weights, points) => ({
  x: weights.reduce((sum, weight, index) => sum + weight * points[index].x, 0),
  y: weights.reduce((sum, weight, index) => sum + weight * points[index].y, 0)
});

const blossom = (curve, from, to) => blend([(1 - from) * (1 - to), (1 - from) * to + from * (1 - to), from * to], curve);

const present = (targets) => targets.filter((nodes) => nodes.length && nodes.every(Boolean));

function boxOf(nodes, origin) {
  const rects = nodes.map((node) => node.getBoundingClientRect());
  const left = Math.min(...rects.map((rect) => rect.left));
  const top = Math.min(...rects.map((rect) => rect.top));
  const right = Math.max(...rects.map((rect) => rect.right));
  const bottom = Math.max(...rects.map((rect) => rect.bottom));
  return {
    x: left - origin.left - PAD,
    y: top - origin.top - PAD,
    width: right - left + PAD * 2,
    height: bottom - top + PAD * 2
  };
}

const overlapAlong = (box, other, [start, size]) =>
  Math.min(box[start] + box[size], other[start] + other[size]) - Math.max(box[start], other[start]);

function part(box, other) {
  const overlaps = AXES.map((axis) => overlapAlong(box, other, axis));
  if (overlaps.some((overlap) => overlap <= 0)) return;
  const [start, size] = AXES[overlaps.indexOf(Math.min(...overlaps))];
  const [first, second] = box[start] <= other[start] ? [box, other] : [other, box];
  const end = second[start] + second[size];
  const middle = (first[start] + first[size] + second[start]) / 2;
  first[size] = middle - RING_GAP / 2 - first[start];
  second[start] = middle + RING_GAP / 2;
  second[size] = end - second[start];
}

function separated(boxes) {
  boxes.forEach((box, index) => boxes.slice(index + 1).forEach((other) => part(box, other)));
  return boxes;
}

function roundedPath({ x, y, width, height }, corner) {
  const radius = Math.min(corner, width / 2, height / 2);
  const arc = (point) => `A${radius} ${radius} 0 0 1 ${at(point)}`;
  return [
    `M${at({ x: x + radius, y })}`,
    `H${(x + width - radius).toFixed(PRECISION)}`, arc({ x: x + width, y: y + radius }),
    `V${(y + height - radius).toFixed(PRECISION)}`, arc({ x: x + width - radius, y: y + height }),
    `H${(x + radius).toFixed(PRECISION)}`, arc({ x, y: y + height - radius }),
    `V${(y + radius).toFixed(PRECISION)}`, arc({ x: x + radius, y }),
    'Z'
  ].join('');
}

const ringPath = (box) => roundedPath(box, RADIUS);

const middleOf = (size) => ({ x: size.width / 2, y: size.height / 2 });

const reversed = ({ x, y }) => ({ x: -x, y: -y });

const inside = ({ x, y }, size) => x >= 0 && y >= 0 && x <= size.width && y <= size.height;

function edgeOf(box, direction) {
  const reach = Math.min(Math.abs(box.width / 2 / direction.x), Math.abs(box.height / 2 / direction.y));
  return shifted(centerOf(box), direction, reach);
}

const tailOf = (box, direction) => shifted(edgeOf(box, direction), direction, POINTER.gap + POINTER.length);

function outward(box, size) {
  const center = centerOf(box);
  const middle = middleOf(size);
  if (gapOf(center, middle) < Math.min(size.width, size.height) * CENTER_ZONE) return FALLBACK;
  const away = toward(middle, center);
  return inside(tailOf(box, away), size) ? away : reversed(away);
}

function headPath(tip, pointing) {
  const base = shifted(tip, pointing, -POINTER.head);
  const side = { x: -pointing.y, y: pointing.x };
  const wing = POINTER.head * POINTER.spread;
  return `M${at(tip)}L${at(shifted(base, side, wing))}L${at(shifted(base, side, -wing))}Z`;
}

const shaftHtml = (shaft) => `<path class="callout__shaft callout__shaft--halo" d="${shaft}"/>`
  + `<path class="callout__shaft" d="${shaft}"/>`;

function pointerHtml(box, size) {
  const direction = outward(box, size);
  const tip = shifted(edgeOf(box, direction), direction, POINTER.gap);
  const base = shifted(tip, direction, POINTER.head);
  const tail = shifted(tip, direction, POINTER.length);
  const pointing = reversed(direction);
  const nudge = `--nudge-x: ${pointing.x.toFixed(2)}; --nudge-y: ${pointing.y.toFixed(2)}`;
  return `<g class="callout__pointer" style="${nudge}">`
    + shaftHtml(`M${at(tail)}L${at(base)}`)
    + `<path class="callout__head" d="${headPath(tip, pointing)}"/></g>`;
}

function outerCorner(from, to, middle) {
  const [first, second] = [{ x: from.x, y: to.y }, { x: to.x, y: from.y }];
  return gapOf(first, middle) > gapOf(second, middle) ? first : second;
}

function arcHtml(from, to, middle) {
  const curve = [from, outerCorner(from, to, middle), to];
  const start = blossom(curve, CYCLE_TRIM, CYCLE_TRIM);
  const control = blossom(curve, CYCLE_TRIM, 1 - CYCLE_TRIM);
  const tip = blossom(curve, 1 - CYCLE_TRIM, 1 - CYCLE_TRIM);
  const pointing = toward(control, tip);
  const base = shifted(tip, pointing, -POINTER.head);
  return shaftHtml(`M${at(start)}Q${at(control)} ${at(base)}`)
    + `<path class="callout__head" d="${headPath(tip, pointing)}"/>`;
}

const cycleHtml = (points, middle) => `<g class="callout__cycle">${points
  .map((point, index) => arcHtml(point, points[(index + 1) % points.length], middle))
  .join('')}</g>`;

const ringHtml = (box) => {
  const ring = ringPath(box);
  return `<path class="callout__halo" d="${ring}" pathLength="1"/><path class="callout__ring" d="${ring}" pathLength="1"/>`;
};

export class CalloutView {
  constructor(svg, stage) {
    this.svg = svg;
    this.stage = stage;
    this.targets = [];
    this.cycle = [];
    new ResizeObserver(() => this.resized()).observe(stage);
  }

  resized() {
    const { width, height } = this.stage.getBoundingClientRect();
    if (width === this.size?.width && height === this.size?.height) return;
    this.draw(false);
  }

  point(targets, cycle = []) {
    this.targets = present(targets);
    this.cycle = present(cycle);
    this.draw(true);
  }

  draw(entering) {
    const empty = !this.targets.length && !this.cycle.length;
    this.svg.toggleAttribute('hidden', empty);
    this.svg.classList.toggle(ENTER_CLASS, entering);
    if (empty) {
      this.svg.innerHTML = '';
      return;
    }
    const origin = this.stage.getBoundingClientRect();
    const size = { width: origin.width, height: origin.height };
    this.size = size;
    const boxes = separated(this.targets.map((nodes) => boxOf(nodes, origin)));
    const stops = this.cycle.map((nodes) => centerOf(boxOf(nodes, origin)));
    const veil = roundedPath({ x: 0, y: 0, ...size }, STAGE_RADIUS);
    this.svg.setAttribute('viewBox', `0 0 ${size.width} ${size.height}`);
    this.svg.innerHTML = html([
      boxes.length > 0 && `<path class="callout__veil" d="${veil}${boxes.map(ringPath).join('')}"/>`,
      boxes.map(ringHtml),
      boxes.map((box) => pointerHtml(box, size)),
      stops.length > 0 && cycleHtml(stops, middleOf(size))
    ]);
  }
}
