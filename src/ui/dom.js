export function span(content, className) {
  const node = document.createElement('span');
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}

export function link(content, href, className) {
  const node = document.createElement('a');
  if (className) node.className = className;
  node.href = href;
  node.target = '_blank';
  node.rel = 'noreferrer';
  node.textContent = content;
  return node;
}

export function box(className, children) {
  const node = document.createElement('div');
  if (className) node.className = className;
  node.append(...children);
  return node;
}
