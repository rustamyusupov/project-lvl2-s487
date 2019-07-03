import fs from 'fs';
import path from 'path';
import parse from './parsers';
import buildAst from './buildAst';
import render from './formatters';

export default (firstConfig, secondConfig, format) => {
  const firstData = fs.readFileSync(firstConfig, 'utf8');
  const secondData = fs.readFileSync(secondConfig, 'utf8');

  const firstExt = path.extname(firstConfig).replace('.', '');
  const secondExt = path.extname(secondConfig).replace('.', '');

  const firstParsed = parse(firstExt, firstData);
  const secondParsed = parse(secondExt, secondData);

  const ast = buildAst(firstParsed, secondParsed);

  return render(ast, format);
};
