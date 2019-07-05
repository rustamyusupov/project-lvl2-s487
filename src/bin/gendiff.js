#!/usr/bin/env node

import program from 'commander';

import { version } from '../../package.json';
import diff from '..';

const run = () => {
  program
    .description('Compares two configuration files and shows a difference.')
    .version(version)
    .option('-f, --format [type]', 'output format', 'tree')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      console.log(diff(firstConfig, secondConfig, program.format));
    });

  program.parse(process.argv);
};

run();
