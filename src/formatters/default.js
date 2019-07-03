import _ from 'lodash/fp';

const defaultIndent = '  ';
const increment = 1;
const getIndents = depth => `${defaultIndent}${defaultIndent}`.repeat(depth);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  return `{\n${Object.keys(value)
    .map(key => `${getIndents(depth + increment)}${key}: ${value[key]}`)
    .join('\n')}\n${getIndents(depth)}}`;
};

const operations = {
  unchanged: ({ key, valueBefore }, depth) => `${getIndents(depth + increment)}${key}: ${stringify(valueBefore, depth + increment)}`,
  add: ({ key, valueAfter }, depth) => `${defaultIndent}${getIndents(depth)}+ ${key}: ${stringify(valueAfter, depth + increment)}`,
  remove: ({ key, valueBefore }, depth) => `${defaultIndent}${getIndents(depth)}- ${key}: ${stringify(valueBefore, depth + increment)}`,
  change: ({ key, valueBefore, valueAfter }, depth) => [
    operations.remove({ key, valueBefore }, depth),
    operations.add({ key, valueAfter }, depth),
  ],
  object: ({ key, children }, depth, render) => `${getIndents(depth + increment)}${key}: ${render(children, depth + increment)}`,
};

const render = (data, depth = 0) => {
  const result = data.map(node => operations[node.type](node, depth, render));

  return `{\n${_.flatten(result).join('\n')}\n${getIndents(depth)}}`;
};

export default render;
