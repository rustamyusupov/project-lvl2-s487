#!/usr/bin/env node

import program from 'commander';

import { version } from '../../package.json';
import diff from '..';

const run = () => {
  program
    .description('Compares two configuration files and shows a difference.')
    .version(version)
    .option('-V, --version', 'output the version number')
    .option('-f, --format <type>', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((cmd, env) => {
      console.log(cmd);
      console.log(env);
      diff();
    });

  program.parse(process.argv);
};

run();
