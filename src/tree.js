import _ from 'lodash';

const getKeys = (data1, data2) => _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

const toString = (value, depth) => {
  if (!_.isObject(value)) return `${value}`;

  const specialChar = ' ';
  const countChars = 4;

  const currentCount = depth * countChars;
  const indent = specialChar.repeat(currentCount);
  const bracketInd = specialChar.repeat(currentCount - countChars);

  const props = Object.entries(value);
  const result = props.map(([key, val]) => `${indent}${key}: ${toString(val, depth + 1)}`);

  return ['{', ...result, `${bracketInd}`].join('\n');
};

const buildNode = (data1, data2, key) => {
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
  const keys = getKeys(data1, data2);

  const tree = keys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        key,
        value: makeTree(data1[key], data2[key]),
        status: 'nested',
      };
    }

    return buildNode(data1, data2, key);
  });

  return _.sortBy(tree, (el) => el.key);
};

export {
  toString,
  makeTree,
};
