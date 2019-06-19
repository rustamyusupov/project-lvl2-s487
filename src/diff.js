import {
  uniq, has, isObject, flatten,
} from 'lodash/fp';

import parser from './parsers';

// [
//   {
//     key: 'test',
//     operation: 'none',
//     children: [
//       {
//         key: 'test1',
//         operation: 'add',
//         values: 200,
//       },
//       {
//         key: 'test2',
//         operation: 'delete',
//         children: [...],
//       }
//     ]
//   },
//   {
//     key: 'test3',
//     operation: 'none',
//     value: 'bar'
//   }
// ]

// 1. первый есть, а второго нет -> operation: 'delete', value: {firstValue}
// 2. первого нет, а второй есть -> operation: 'add', value: {secondValue}
// 3. первый и второй есть
// 3.1. первый и второй объекты -> operation: 'none', children: diff()
// 3.2. первый и второй равны -> operation: 'none', value: {firstValue}
// 3.3. первый и второй не равны -> operation: 'change', value: {secondValue}

export default (firstConfig, secondConfig) => {
  const firstData = parser(firstConfig);
  const secondData = parser(secondConfig);

  const diff = (first, second) => {
    const keys = [...Object.keys(first), ...Object.keys(second)];
    const uniqKeys = uniq(keys);

    return uniqKeys.reduce((acc, key) => {
      const hasFirstKey = has(key)(first);
      const hasSecondKey = has(key)(second);
      const firstValue = first[key];
      const secondValue = second[key];

      // has first, but hasn't second
      if (hasFirstKey && !hasSecondKey) {
        return [
          ...acc,
          {
            key,
            operation: 'delete',
            value: firstValue,
          },
        ];
      }

      // hasn't first, but has second
      if (!hasFirstKey && hasSecondKey) {
        return [
          ...acc,
          {
            key,
            operation: 'add',
            value: secondValue,
          },
        ];
      }

      // has both
      if (hasFirstKey && hasSecondKey) {
        // both objects
        if (isObject(firstValue) && isObject(secondValue)) {
          return [
            ...acc,
            {
              key,
              operation: 'none',
              children: diff(firstValue, secondValue),
            },
          ];
        }

        // equals
        if (firstValue === secondValue) {
          return [
            ...acc,
            {
              key,
              operation: 'none',
              value: firstValue,
            },
          ];
        }

        // not equals
        if (firstValue !== secondValue) {
          return [
            ...acc,
            {
              key,
              operation: 'change',
              value: {
                before: firstValue,
                after: secondValue,
              },
            },
          ];
        }
      }

      return acc;
    }, []);
  };

  return diff(firstData, secondData);
};
