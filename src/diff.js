import fs from 'fs';
import { uniq, has } from 'lodash/fp';

export const readFile = (path) => {
  try {
    const data = fs.readFileSync(path, 'utf8');

    return data;
  } catch (e) {
    console.log('Error:', e.stack);
  }

  return null;
};

export default (firstConfig, secondConfig) => {
  const firstJson = readFile(firstConfig);
  const secondJson = readFile(secondConfig);
  const firstData = JSON.parse(firstJson);
  const secondData = JSON.parse(secondJson);
  const keys = [...Object.keys(firstData), ...Object.keys(secondData)];
  const uniqKeys = uniq(keys);

  const diff = uniqKeys.reduce((acc, key) => {
    const hasFirstKey = has(key)(firstData);
    const hasSecondKey = has(key)(secondData);
    const firstValue = firstData[key];
    const secondValue = secondData[key];

    if (hasFirstKey && hasSecondKey) {
      if (firstValue === secondValue) {
        // w/o change
        acc.push(`    ${key}: ${firstValue}`);
      } else {
        // changed
        acc.push(`  - ${key}: ${firstValue}`);
        acc.push(`  + ${key}: ${secondValue}`);
      }
    } else {
      // add/delete
      acc.push(hasSecondKey ? `  + ${key}: ${secondValue}` : `  - ${key}: ${firstValue}`);
    }

    return acc;
  }, []);

  const result = `{\n${diff.join('\n')}\n}`;

  return result;
};
