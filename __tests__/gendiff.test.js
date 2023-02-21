import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import file1 from '../__fixtures__/file1.json';
import file2 from '../__fixtures__/file2.json';

test('genDiff', () => {
  const result = `{
    - follow: false
      host: hexlet.io
    - proxy: 123.234.53.22
    - timeout: 50
    + timeout: 20
    + verbose: true
  }`;
  expect(genDiff(file1, file2)).toBe(result);
});
