#!/usr/bin/env node
import { program } from 'commander';
import { genDiff } from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .usage('[options] <filepath1> <filepath2>')
  .arguments('<file1> <file2>')
  .version('0.0.1', '-v, --version', 'output the version number')
  .action((file1, file2) => { genDiff(file1, file2); })
  .parse();
