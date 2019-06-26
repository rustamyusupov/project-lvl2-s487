import _ from 'lodash/fp';

const operations = {
  none: ({ key, valueBefore }) => `${key}: ${valueBefore}`,
  add: ({ key, valueAfter }) => `+ ${key}: ${valueAfter}`,
  remove: ({ key, valueBefore }) => `- ${key}: ${valueBefore}`,
  change: ({ key, valueBefore, valueAfter }) => [
    operations.remove({ key, valueBefore }),
    operations.add({ key, valueAfter }),
  ],
  object: ({ key, children }, render) => `${key}: ${render(children)}`,
};

const render = (data) => {
  const result = data.map(node => operations[node.type](node, render));

  return _.flatten(result).join('\n');
};

export default render;
