import _ from 'lodash/fp';

const getNode = (key, type, valueBefore, valueAfter = '', children = []) => ({
  key,
  type,
  valueBefore,
  valueAfter,
  children,
});

const buildAst = (firstData, secondData) => {
  const keys = _.union(Object.keys(firstData), Object.keys(secondData));

  return keys.sort().map((key) => {
    const firstValue = firstData[key];
    const secondValue = secondData[key];
    const hasFirstKey = _.has(key)(firstData);
    const hasSecondKey = _.has(key)(secondData);

    if (_.isObject(firstValue) && _.isObject(secondValue)) {
      return getNode(key, 'object', '', '', buildAst(firstValue, secondValue));
    }

    if (!hasFirstKey) {
      return getNode(key, 'add', '', secondValue);
    }

    if (!hasSecondKey) {
      return getNode(key, 'remove', firstValue);
    }

    if (firstValue === secondValue) {
      return getNode(key, 'unchanged', firstValue);
    }

    if (firstValue !== secondValue) {
      return getNode(key, 'change', firstValue, secondValue);
    }

    return 'unknown';
  });
};

export default buildAst;
