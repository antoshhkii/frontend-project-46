import { toString } from '../tree.js';

const labels = {
  deleted: '- ',
  added: '+ ',
  nested: '  ',
  unchanged: '  ',
};

const makeDiffString = (indent, type, key, value, depth) => `${indent}${labels[type]}${key}: ${toString(value, depth + 1)}`;

const getStylishLine = (status, indent, key, value, depth) => {
  switch (status) {
    case 'deleted':
      return makeDiffString(indent, 'deleted', key, value, depth);
    case 'added':
      return makeDiffString(indent, 'added', key, value, depth);
    case 'changed':
      return `${makeDiffString(indent, 'deleted', key, value.oldValue, depth)}\n${makeDiffString(indent, 'added', key, value.newValue, depth)}`;
    default:
      return makeDiffString(indent, 'unchanged', key, value, depth);
  }
};

const stylish = (tree, spacesCount = 4, replacer = ' ') => {
  const iter = (el, depth) => {
    const indentSize = depth * spacesCount;
    const indent = replacer.repeat(indentSize - 2);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const lines = el.map(({ key, value, status }) => {
      if (status === 'nested') {
        return `${indent}${labels.nested}${key}: ${iter(value, depth + 1)}`;
      }
      return getStylishLine(status, indent, key, value, depth);
    });
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(tree, 1);
};

export default stylish;
