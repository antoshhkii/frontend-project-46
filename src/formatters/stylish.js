import { stringify } from '../tree.js';

const labels = {
  deleted: '- ',
  added: '+ ',
  nested: '  ',
  unchanged: '  ',
};

const makeDiffString = (indent, type, key, value, depth) => `${indent}${labels[type]}${key}: ${stringify(value, depth + 1)}`;