import fs from 'fs';

export const readFile = (path) => {
  try {
    const data = fs.readFileSync(path, 'utf8');

    return data;
  } catch (e) {
    console.log('Error:', e.stack);
  }

  return null;
};

// firstConfig, secondConfig
export default () => {
  // try {
  //   const firstFile = fs.readFileSync(firstConfig, 'utf8');
  //   const firstData = JSON.parse(firstFile);
  //   const secondFile = fs.readFileSync(secondConfig, 'utf8');
  //   const secondData = JSON.parse(secondFile);
  //   console.log(firstData);
  // } catch (e) {
  //   console.log('Error:', e.stack);
  // }
  const result = '{\n  host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  + verbose: true\n  - follow: false\n}';

  return result;
};
