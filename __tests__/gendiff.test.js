import fs from 'fs';
import { test, expect } from '@jest/globals';
import { genDiff, getPath } from '../src/index.js';

const pathToExpect = getPath('./__fixtures__/expected.txt');
const expectedFile = fs.readFileSync(pathToExpect, 'utf-8');

test('genDiff', () => {
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toEqual(expectedFile);
});
