import _ from 'lodash/fp';

const getNode = (key, type, valueBefore, valueAfter = '', children = []) => ({
  key,
  type,
  valueBefore,
  valueAfter,
  children,
});

const diff = (firstData, secondData) => {
  const keys = _.union(Object.keys(firstData), Object.keys(secondData));

  return keys.map((key) => {
    const firstValue = firstData[key];
    const secondValue = secondData[key];
    const hasFirstKey = _.has(key)(firstData);
    const hasSecondKey = _.has(key)(secondData);

    if (_.isObject(firstValue) && _.isObject(secondValue)) {
      return getNode(key, 'object', '', '', diff(firstValue, secondValue));
    }

    if (!hasFirstKey) {
      return getNode(key, 'add', '', secondValue);
    }

    if (!hasSecondKey) {
      return getNode(key, 'delete', firstValue);
    }

    if (firstValue === secondValue) {
      return getNode(key, 'none', firstValue);
    }

    if (firstValue !== secondValue) {
      return getNode(key, 'change', firstValue, secondValue);
    }

    return 'unknown';
  });
};

export default diff;
