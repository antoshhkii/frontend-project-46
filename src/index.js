import parse from './parse.js';
import formatter from './formatters/index.js';
import { makeTree } from './tree.js';

const genDiff = (filepath1, filepath2, formatname) => {
  const dataFile1 = parse(filepath1);
  const dataFile2 = parse(filepath2);

  const generalDifference = makeTree(dataFile1, dataFile2);
  return formatter(generalDifference, formatname);
};

export default genDiff;
