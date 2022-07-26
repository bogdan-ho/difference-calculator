#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format (stylish, plain, json)', 'stylish')
  .argument('<filepath1>', 'filepath first')
  .argument('<filepath2>', 'filepath second')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.opts().format));
  });

program.parse();
