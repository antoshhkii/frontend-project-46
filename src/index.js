import fs from 'fs';
import path from 'path';
import parse from './parse.js';
import formatter from './formatters/index.js';
import makeTree from './tree.js';

const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');
const makePath = (filepath) => path.resolve(process.cwd(), filepath);

const genDiff = (filepath1, filepath2, formatname = 'stylish') => {
  const pathToFile1 = makePath(filepath1);
  const pathToFile2 = makePath(filepath2);

  const dataFile1 = readFile(pathToFile1);
  const dataFile2 = readFile(pathToFile2);

  const parsedFile1 = parse(dataFile1);
  const parsedFile2 = parse(dataFile2);

  const generalDifference = makeTree(parsedFile1, parsedFile2);
  return formatter(generalDifference, formatname);
};

export default genDiff;
