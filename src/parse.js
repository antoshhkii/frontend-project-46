import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';

export const getFile = (file) => fs.readFileSync(path.resolve(process.cwd(), file), 'utf-8');

export const parse = (filepath) => {
  const extension = path.extname(filepath);
  const file = getFile(filepath);

  let object;
  if (extension === '.json') {
    object = yaml.load(file);
  } else {
    object = JSON.parse(file);
  }
  return object;
};
