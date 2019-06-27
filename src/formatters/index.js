import defaultRender from './default';
import plainRender from './plain';

const formatters = {
  default: defaultRender,
  plain: plainRender,
};

export default (data, format) => formatters[format](data);
