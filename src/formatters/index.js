import jsonRender from './json';
import plainRender from './plain';
import treeRender from './tree';

const formatters = {
  json: jsonRender,
  plain: plainRender,
  tree: treeRender,
};

export default (data, format) => formatters[format](data);
