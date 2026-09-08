const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
const ESCAPABLE = /[&<>"]/g;
const VOID_TAGS = new Set(['img']);
const OMITTED = new Set([null, undefined, false, '']);

export const escape = (value) => String(value).replace(ESCAPABLE, (char) => ESCAPES[char]);

export const classNames = (...names) => names.filter(Boolean).join(' ');

export const html = (children) => [children].flat(Infinity)
  .filter((part) => !OMITTED.has(part))
  .join('');

const attribute = ([name, value]) => (value === true ? ` ${name}` : ` ${name}="${escape(value)}"`);

const attributes = (source) => Object.entries(source)
  .filter(([, value]) => !OMITTED.has(value))
  .map(attribute)
  .join('');

export function tag(name, attrs = {}, children = '') {
  const open = `<${name}${attributes(attrs)}>`;
  return VOID_TAGS.has(name) ? open : `${open}${html(children)}</${name}>`;
}

export const div = (className, children) => tag('div', { class: className }, children);

export const text = (content, className) => tag('span', { class: className }, escape(content));

export const button = (content, attrs) => tag('button', { type: 'button', ...attrs }, content);

export const anchor = (content, href, className) =>
  tag('a', { class: className, href, target: '_blank', rel: 'noreferrer' }, content);
