import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const mapping = {
  json: f => JSON.parse(f),
  yaml: f => yaml.safeLoad(f, 'utf8'),
};

export const readFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');

    return data;
  } catch (e) {
    console.log('Error:', e.stack);
  }

  return null;
};

export default (filePath) => {
  const data = readFile(filePath);
  const ext = path.extname(filePath).replace('.', '');
  const parsedData = mapping[ext](data);

  console.log(parsedData);

  return parsedData;
};
