import _ from 'lodash';

const getUnionKeys = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.union(keys1, keys2);

  return unionKeys;
};

const toString = (value, depth) => {
  if (!_.isObject(value)) return `${value}`;

  const replacer = ' ';
  const spacesCount = 4;

  const indentSize = depth * spacesCount;
  const indent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spacesCount);

  const lines = Object.entries(value).map(([key, val]) => `${indent}${key}: ${toString(val, depth + 1)}`);
  const result = ['{', ...lines, `${bracketIndent}}`].join('\n');
  return result;
};

const getNode = (data1, data2, key) => {
  if (!Object.hasOwn(data2, key)) {
    return ({ key, value: data1[key], status: 'deleted' });
  } if (!Object.hasOwn(data1, key)) {
    return ({ key, value: data2[key], status: 'added' });
  } if (data1[key] !== data2[key]) {
    return ({ key, value: { oldValue: data1[key], newValue: data2[key] }, status: 'changed' });
  }
  return ({ key, value: data1[key], status: 'unchanged' });
};

const makeTree = (data1, data2) => {
  const unionKeys = getUnionKeys(data1, data2);
  const result = unionKeys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, value: makeTree(data1[key], data2[key]), status: 'nested' };
    }
    return getNode(data1, data2, key);
  });
  return _.sortBy(result, (el) => el.key);
};

export {
  toString,
  makeTree,
};
