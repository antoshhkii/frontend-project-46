import fs from 'fs';
import { test, expect } from '@jest/globals';
import { genDiff, getPath } from '../src/index.js';

const firstExpectedFile = fs.readFileSync(getPath('./__fixtures__/expected_files/gendiff1-2.txt'), 'utf-8');
const secondExpectedFile = fs.readFileSync(getPath('./__fixtures__/expected_files/gendiff3-4.txt'), 'utf-8');

const firstStrPath = ['./__fixtures__/json_test_files/file1.json', './__fixtures__/json_test_files/file2.json'];
const secondStrPath = ['./__fixtures__/json_test_files/file3.json', './__fixtures__/json_test_files/file4.json'];

test('genDiff.json1', () => {
  expect(genDiff(firstStrPath[0], firstStrPath[1])).toEqual(firstExpectedFile);
});

test('genDiff.json2', () => {
  expect(genDiff(secondStrPath[0], secondStrPath[1])).toEqual(secondExpectedFile);
});
