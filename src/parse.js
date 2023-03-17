import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const getAbsolutePath = (filename) => path.resolve(process.cwd(), filename);

const getFileExtension = (filename) => path.extname(filename);

const getData = (filePath, extension) => {
  const absolutePath = getAbsolutePath(filePath);
  if (extension === '.yaml' || extension === '.yml') {
    return yaml.load(fs.readFileSync(absolutePath));
  }
  return JSON.parse(fs.readFileSync(absolutePath));
};

const parse = (filename) => {
  const extension = getFileExtension(filename);
  return getData(filename, extension);
};

export default parse;
