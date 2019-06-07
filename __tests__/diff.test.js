import diff from '../src';
import { readFile } from '../src/parsers';

const paths = ['json', 'yaml'].map(ext => [
  ext,
  `__tests__/__fixtures__/before.${ext}`,
  `__tests__/__fixtures__/after.${ext}`,
]);

test.each(paths)('compare %s files', (_, firstConfig, secondConfig) => {
  expect(diff(firstConfig, secondConfig)).toBe(readFile('__tests__/__fixtures__/result.txt'));
});
