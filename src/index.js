import path from 'path';
import parse from 'yaml';
import fs from 'fs';
import _ from 'lodash';

export const getPath = (file) => path.resolve(process.cwd(), file);

export const genDiff = (filepath1, filepath2) => {
  // const firstPath = JSON.parse(fs.readFileSync(filepath1, 'utf-8'));
  // const secondPath = JSON.parse(fs.readFileSync(filepath2, 'utf-8'));
  // const firstObject = getPath(firstPath);
  // const secondObject = getPath(secondPath);
  const firstPath = getPath(filepath1);
  const secondPath = getPath(filepath2);
  const firstObject = JSON.parse(fs.readFileSync(firstPath, 'utf-8'));
  const secondObject = JSON.parse(fs.readFileSync(secondPath, 'utf-8'));

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
  console.log(`{${result}\n}`);
  return `{${result}\n}`;
};
