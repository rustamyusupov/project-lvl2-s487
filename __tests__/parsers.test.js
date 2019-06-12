import _ from 'lodash/fp';

import parser from '../src/parsers';

const paths = ['json', 'yaml', 'ini'].map(ext => [ext, `__tests__/__fixtures__/${ext}/before.${ext}`]);

test.each(paths)('parse %s file', (__, file) => expect(_.isObject(parser(file))).toBe(true));
