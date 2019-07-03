import fs from 'fs';

import gendiff from '../src';

test.each([
  ['json', 'plain'],
  ['yml', 'plain'],
  ['ini', 'plain'],
  ['json', 'default'],
  ['yml', 'default'],
  ['ini', 'default'],
  ['json', 'json'],
  ['yml', 'json'],
  ['ini', 'json'],
])('compare %s files, format %s', (ext, format) => {
  const diff = gendiff(`__tests__/__fixtures__/before.${ext}`, `__tests__/__fixtures__/after.${ext}`, format);
  const result = fs.readFileSync(`__tests__/__fixtures__/result-${format}.txt`, 'utf8');

  expect(diff).toStrictEqual(result);
});
