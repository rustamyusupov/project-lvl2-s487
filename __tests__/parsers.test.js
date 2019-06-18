import _ from 'lodash/fp';

import parser from '../src/parsers';

const paths = ['json', 'yaml', 'ini'].map(ext => [ext, `__tests__/__fixtures__/${ext}/before.${ext}`]);
const nestedPaths = ['json', 'yaml', 'ini'].map(ext => [ext, `__tests__/__fixtures__/${ext}/after-nested.${ext}`]);

test.each(paths.concat(nestedPaths))('parse %s file', (__, file) => expect(_.isObject(parser(file))).toBe(true));
