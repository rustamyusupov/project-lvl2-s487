import defaultRender from './default';
import plainRender from './plain';
import jsonRender from './json';

const formatters = {
  default: defaultRender,
  plain: plainRender,
  json: jsonRender,
};

export default (data, format) => formatters[format](data);
