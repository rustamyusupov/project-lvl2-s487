import _ from 'lodash/fp';

import parser from '../src/parsers';

test('parsers', () => {
  const jsonFile = '__tests__/__fixtures__/before.json';
  const yamlFile = '__tests__/__fixtures__/after.yaml';

  const jsonData = parser(jsonFile);
  const yamlData = parser(yamlFile);

  expect(_.isObject(jsonData)).toBe(true);
  expect(_.isObject(yamlData)).toBe(true);
});
