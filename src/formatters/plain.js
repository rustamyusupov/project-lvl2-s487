import _ from 'lodash/fp';

const stringify = value => (_.isObject(value) ? '[complex value]' : `'${value}'`);

const operations = {
  none: () => [],
  add: ({ key, valueAfter }, path) => `Property '${path}${key}' was added with value: ${stringify(valueAfter)}`,
  remove: ({ key }, path) => `Property '${path}${key}' was removed`,
  change: ({ key, valueBefore, valueAfter }, path) => `Property '${path}${key}' was updated. From ${stringify(valueBefore)} to ${stringify(valueAfter)}`,
  object: ({ key, children }, path, render) => render(children, `${path}${key}.`),
};

const render = (data, path = '') => {
  const result = data.reduce((acc, node) => {
    const parsed = operations[node.type](node, path, render);

    return [...acc, parsed];
  }, []);

  return _.flatten(result).join('\n');
};

export default render;
