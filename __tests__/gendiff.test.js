import { test, expect } from '@jest/globals';
import { genDiff, makePath } from '../library.js';

test('JSON files are parsing', () => {
  expect(genDiff(makePath('file1.json'), makePath('file2.json')))
    .toEqual(makePath('gendiffJSON1-2.txt'));

  expect(genDiff(makePath('file3.json'), makePath('file4.json')))
    .toEqual(makePath('gendiffJSON3-4.txt'));
});

test('YAML & YML files are parsing', () => {
  expect(genDiff(makePath('file1.yaml'), makePath('file2.yaml')))
    .toEqual(makePath('gendiffYAML1-2.txt'));
  expect(genDiff(makePath('file1.yml'), makePath('file2.yml')))
    .toEqual(makePath('gendiffYAML3-4.txt'));
  expect(genDiff(makePath('file3.yaml'), makePath('file3.yml')))
    .toEqual(makePath('gendiffYAML-YML.txt'));
});

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
