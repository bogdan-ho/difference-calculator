#!/usr/bin/env node

import genDiff from '../src/genDiff.js';
import { Command } from 'commander';
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format')
  // .argument('<type>', 'output format')
  .argument('<filepath1>', 'filepath first')
  .argument('<filepath2>', 'filepath second')
  .action(genDiff);

program.parse();