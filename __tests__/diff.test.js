import diff from '../src';
import { readFile } from '../src/diff';

test('compare two files', () => {
  const firstConfig = '__tests__/__fixtures__/before.json';
  const secondConfig = '__tests__/__fixtures__/after.json';
  const resultFilePath = '__tests__/__fixtures__/result.txt';

  const filesDiff = diff(firstConfig, secondConfig);
  const result = readFile(resultFilePath);

  expect(filesDiff).toBe(result);
});
