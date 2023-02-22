import _ from 'lodash';
import { parse } from './parse.js';

const genDiff = (filepath1, filepath2) => {
  const firstObject = parse(filepath1);
  const secondObject = parse(filepath2);
  const firstKeys = Object.keys(firstObject);
  const secondKeys = Object.keys(secondObject);
  const commonKeys = _.union(firstKeys, secondKeys);
  const sortedKeys = commonKeys.sort();

  const result = sortedKeys.reduce((acc, el) => {
    let final = acc;
    if (!Object.hasOwn(secondObject, el)) {
      final += `\n  - ${el}: ${firstObject[el]}`;
    } else if (firstObject[el] === secondObject[el]) {
      final += `\n    ${el}: ${firstObject[el]}`;
    } else if (!Object.hasOwn(firstObject, el)) {
      final += `\n  + ${el}: ${secondObject[el]}`;
    } else if (firstObject[el] !== secondObject[el]) {
      final += `\n  - ${el}: ${firstObject[el]}\n  + ${el}: ${secondObject[el]}`;
    }
    return final;
  }, '');
  return `{${result}\n}`;
};

export default genDiff;
