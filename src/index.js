import { version } from '../package.json';

const program = require('commander');

export default () => {
  program
    .description('Compares two configuration files and shows a difference.')
    .version(version)
    .option('-V, --version', 'output the version number')
    .option('-f, --format <type>', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((cmd, env) => {
      console.log(cmd);
      console.log(env);
    });

  program.parse(process.argv);
};
