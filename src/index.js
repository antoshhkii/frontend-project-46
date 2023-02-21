import path from 'path';
import fs from 'fs';
import _ from 'lodash'; 

const getPath = (file) => path.resolve(file);

export const genDiff = (filepath1, filepath2) => {
  const firstPath = getPath(filepath1);
  const secondPath = getPath(filepath2);
  const firstObject = JSON.parse(fs.readFileSync(firstPath));
  const secondObject = JSON.parse(fs.readFileSync(secondPath));

  const firstKeys = Object.keys(firstObject);
  const secondKeys = Object.keys(secondObject);
  const commonKeys = _.union(firstKeys, secondKeys);
  const sortedKeys = commonKeys.sort();

  const result = sortedKeys.reduce((acc, el) => {
    if (!Object.hasOwn(secondObject, el)) {
      acc += `\n - ${el}: ${firstObject[el]}`
    } else if (firstObject[el] === secondObject[el]) {
      acc += `\n   ${el}: ${firstObject[el]}`
    } else if (!Object.hasOwn(firstObject, el)) {
      acc += `\n + ${el}: ${secondObject[el]}`
    } else if (firstObject[el] !== secondObject[el]) {
      acc += `\n - ${el}: ${firstObject[el]}\n + ${el}: ${secondObject[el]}`
    }
    return acc;
    }, '');
  console.log(`{${result}\n}`);
  return result;
}

