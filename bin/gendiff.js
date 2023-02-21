#!/usr/bin/env node
import { program } from 'commander';
import { genDiff } from '../src/index.js';

program
    .description('Compares two configuration files and shows a difference.')
    .usage('[options] <filepath1> <filepath2>')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .version('0.0.1', '-v, --version', 'output the version number')
    .option('-f, --format <type>', 'output format')
    .action((filepath1, filepath2) => { genDiff(filepath1, filepath2); })
    .parse()
