import diff, { readFile } from '../src';

const paths = ['json', 'yaml', 'ini'].map(ext => [
  `__tests__/__fixtures__/${ext}/before.${ext}`,
  `__tests__/__fixtures__/${ext}/after.${ext}`,
  '__tests__/__fixtures__/result/result.txt',
  '__tests__/__fixtures__/result/result-plain.txt',
]);

const nestedPaths = ['json', 'yaml', 'ini'].map(ext => [
  `__tests__/__fixtures__/${ext}/before-nested.${ext}`,
  `__tests__/__fixtures__/${ext}/after-nested.${ext}`,
  '__tests__/__fixtures__/result/result-nested.txt',
  '__tests__/__fixtures__/result/result-nested-plain.txt',
]);

test.each(paths.concat(nestedPaths))('compare %s files', (firstConfig, secondConfig, result, resultPlain) => {
  const resultData = readFile(result);
  const resultPlainData = readFile(resultPlain);

  expect(diff(firstConfig, secondConfig, 'default')).toBe(resultData);
  expect(diff(firstConfig, secondConfig, 'plain')).toBe(resultPlainData);
});
