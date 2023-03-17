import path, { dirname } from 'path';
import url from 'url';
import fs from 'fs';
import { test, expect, describe } from '@jest/globals';
import { genDiff } from '../library.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');
const decipherFile = (filename) => readFile(path.join(__dirname, '..', '__fixtures__', filename));

const file1OutputDefault = decipherFile('fileOutput.txt');
const file1OutputPlain = decipherFile('fileOutput_plain.txt');
const file1OutputJson = decipherFile('fileOutput_json.txt');
const file1 = './__fixtures__/file1.json';
const file2 = './__fixtures__/file2.json';
const file3 = './__fixtures__/file1.yml';
const file4 = './__fixtures__/file2.yml';

describe('comparing  files', () => {
  test('simple using', () => {
    expect(genDiff(file1, file2)).toEqual(file1OutputDefault);
    expect(genDiff(file3, file4, 'plain')).toEqual(file1OutputPlain);
    expect(genDiff(file3, file4, 'json')).toEqual(file1OutputJson);
  });
});
