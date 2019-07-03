import fs from 'fs';
import path from 'path';
import parser from './parsers';
import diff from './diff';
import render from './formatters';

export default (firstConfig, secondConfig, format) => {
  const firstData = fs.readFileSync(firstConfig, 'utf8');
  const secondData = fs.readFileSync(secondConfig, 'utf8');

  const firstExt = path.extname(firstConfig).replace('.', '');
  const secondExt = path.extname(secondConfig).replace('.', '');

  const firstParsed = parser(firstExt, firstData);
  const secondParsed = parser(secondExt, secondData);

  const diffData = diff(firstParsed, secondParsed);

  return render(diffData, format);
};
