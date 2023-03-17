#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .usage('[options] <filepath1> <filepath2>')
  .arguments('<file1> <file2>')
  .version('0.0.1', '-v, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const option = program.opts();
    console.log(genDiff(filepath1, filepath2, option.format));
  })
  .parse();
