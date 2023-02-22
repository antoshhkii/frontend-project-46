import { test, expect } from '@jest/globals';
import path from 'path';
import { getFile } from '../src/parse.js';
import genDiff from '../src/index.js';

const makePath = (file) => {
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

test('JSON files are parsing', () => {
  expect(genDiff(makePath('file1.json'), makePath('file2.json')))
    .toEqual(makePath('gendiffJSON1-2.txt'));

  expect(genDiff(makePath('file3.json'), makePath('file4.json')))
    .toEqual(makePath('gendiffJSON3-4.txt'));
});

// test('YAML files are parsing', () => {
//   expect(genDiff(makePath('file1.yaml'), makePath('file2.yaml')))
//     .toEqual(makePath('gendiffYAML1-2.txt'));
//   expect(genDiff(makePath('file1.yml'), makePath('file2.yml')))
//     .toEqual(makePath('gendiffYAML3-4.txt'));
// });

//  test('Throw Errors for parsers', () => {
// expect(genDiff(makePath('file1.yaml'), makePath('file2.yaml')))
// .toEqual(makePath('gendiffYAML1-2.txt'));
//  expect(genDiff(makePath('file1.yaml'), makePath('file2.yaml')))
// .toEqual(makePath('gendiffYAML1-2.txt'));
//  expect(genDiff(makePath('file1.yaml'), makePath('file2.yaml')))
// .toEqual(makePath('gendiffYAML1-2.txt'));
//  expect(genDiff(makePath('file1.yaml'), makePath('file2.yaml')))
// .toEqual(makePath('gendiffYAML1-2.txt'));
//  });
