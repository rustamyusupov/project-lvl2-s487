import diff from '../src';
import { readFile } from '../src/parsers';

const paths = ['json', 'yaml', 'ini'].map(ext => [
  ext,
  `__tests__/__fixtures__/${ext}/before.${ext}`,
  `__tests__/__fixtures__/${ext}/after.${ext}`,
]);

test.each(paths)('compare %s files', (_, firstConfig, secondConfig) => {
  expect(diff(firstConfig, secondConfig)).toBe(readFile('__tests__/__fixtures__/result/result.txt'));
});
