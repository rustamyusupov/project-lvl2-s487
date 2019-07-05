import _ from 'lodash/fp';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;

  return value;
};

const operations = {
  unchanged: () => [],
  add: ({ key, valueAfter }, path) => `Property '${path}${key}' was added with value: ${stringify(valueAfter)}`,
  remove: ({ key }, path) => `Property '${path}${key}' was removed`,
  change: ({ key, valueBefore, valueAfter }, path) => `Property '${path}${key}' was updated. From ${stringify(valueBefore)} to ${stringify(valueAfter)}`,
  object: ({ key, children }, path, render) => render(children, `${path}${key}.`),
};

const render = (data, path = '') => data
  .filter(({ type }) => type !== 'unchanged')
  .map(node => operations[node.type](node, path, render))
  .join('\n');

export default render;
