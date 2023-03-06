import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';

export const getFile = (file) => fs.readFileSync(path.resolve(process.cwd(), file), 'utf-8');

export const parse = (filepath) => {
  const extension = path.extname(filepath);
  const file = getFile(filepath);

  let object;
  switch (extension) {
    case '.json':
      object = JSON.parse(file);

      break;
    case '.yaml':
    case '.yml':
      object = yaml.load(file);

      break;
    default:
      console.log(`File [${file}] does not have a valid parser!`);

      break;
  }
  return object;
};

export const makePath = (file) => {
  const extension = path.extname(file);
  let dirname;

  switch (extension) {
    case '.txt':
      dirname = `./__fixtures__/expected_files/${file}`;
      break;

    case '.json':
      dirname = `./__fixtures__/json_test_files/${file}`;
      break;

    case '.yaml':
    case '.yml':
      dirname = `./__fixtures__/yaml_test_files/${file}`;
      break;

    default:
      console.log(`File [${file}] does not have a valid parser!`);
      break;
  }
  if (extension === '.txt') return getFile(dirname);
  return dirname;
};
