import _ from 'lodash';

const isComplexValue = (value) => _.isObject(value);

const isOkeyWithoutQuotes = (value) => {
  if (value === null) return true;
  switch (typeof value) {
    case 'boolean':
      return true;
    case 'number':
      return true;
    default:
      return false;
  }
};

const getPlainValue = (value) => {
  if (isOkeyWithoutQuotes(value)) return `${value}`;
  if (isComplexValue(value)) return '[complex value]';
  return `'${value}'`;
};

const getPlainLine = (status, value, pathToValue) => {
  switch (status) {
    case 'deleted':
      return `Property '${pathToValue}' was removed`;
    case 'added':
      return `Property '${pathToValue}' was added with value: ${getPlainValue(value)}`;
    case 'changed':
      return `Property '${pathToValue}' was updated. From ${getPlainValue(value.oldValue)} to ${getPlainValue(value.newValue)}`;
    default:
      return [];
  }
};

const plain = (tree) => {
  const iter = (el, keysBefore = []) => {
    const lines = el.flatMap(({ key, value, status }) => {
      const pathToValue = [...keysBefore, key].join('.');
      if (status === 'nested') return iter(value, [...keysBefore, key]);
      return getPlainLine(status, value, pathToValue);
    });
    return lines.join('\n');
  };
  return iter(tree);
};

export default plain;
