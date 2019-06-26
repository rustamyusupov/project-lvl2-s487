import compare, { readFile } from '../src';

const paths = ['json', 'yaml', 'ini'].map(ext => [
  `__tests__/__fixtures__/${ext}/before.${ext}`,
  `__tests__/__fixtures__/${ext}/after.${ext}`,
  '__tests__/__fixtures__/result/result.txt',
]);

const nestedPaths = ['json', 'yaml', 'ini'].map(ext => [
  `__tests__/__fixtures__/${ext}/before-nested.${ext}`,
  `__tests__/__fixtures__/${ext}/after-nested.${ext}`,
  '__tests__/__fixtures__/result/result-nested.txt',
]);

test.each(paths.concat(nestedPaths))('compare %s files', (firstConfig, secondConfig, result) => {
  const diff = compare(firstConfig, secondConfig);
  const resultData = readFile(result);

  expect(diff).toBe(resultData);
});
