import path from 'path';
import fs from 'fs';
import genDiff from './src/index.js';
import parse from './src/parse.js';
import getTree from './src/tree.js';

const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');
const makePath = (filepath) => path.resolve(process.cwd(), filepath);

export {
  genDiff,
  getTree,
  readFile,
  makePath,
  parse,
};
