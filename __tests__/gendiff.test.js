import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import { getFile } from '../src/parse.js';

const firstExpectedFile = getFile('./__fixtures__/expected_files/gendiff1-2.txt');
const secondExpectedFile = getFile('./__fixtures__/expected_files/gendiff3-4.txt');

const firstStrPath = ['./__fixtures__/json_test_files/file1.json', './__fixtures__/json_test_files/file2.json'];
const secondStrPath = ['./__fixtures__/json_test_files/file3.json', './__fixtures__/json_test_files/file4.json'];

test('genDiff.json', () => {
  expect(genDiff(firstStrPath[0], firstStrPath[1])).toEqual(firstExpectedFile);
  expect(genDiff(secondStrPath[0], secondStrPath[1])).toEqual(secondExpectedFile);
});
