import fs from 'fs';
import path from 'path';
import parser from './parsers';
import diff from './diff';
import render from './formatters';

export const readFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    console.log('Error:', e.stack);
  }

  return null;
};

export default (firstConfig, secondConfig, format) => {
  const firstData = readFile(firstConfig);
  const secondData = readFile(secondConfig);

  const firstExt = path.extname(firstConfig).replace('.', '');
  const secondExt = path.extname(secondConfig).replace('.', '');

  const first = parser(firstExt, firstData);
  const second = parser(secondExt, secondData);

  const diffData = diff(first, second);

  return render(diffData, format);
};
