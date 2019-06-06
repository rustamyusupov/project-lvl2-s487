import diff from '../src';
import { readFile } from '../src/diff';

const generateTest = ext => test(`compare ${ext} files`, () => {
  const firstConfig = `__tests__/__fixtures__/before.${ext}`;
  const secondConfig = `__tests__/__fixtures__/after.${ext}`;
  const resultFilePath = '__tests__/__fixtures__/result.txt';

  const filesDiff = diff(firstConfig, secondConfig);
  const result = readFile(resultFilePath);

  expect(filesDiff).toBe(result);
});

['json', 'yaml'].map(generateTest);
