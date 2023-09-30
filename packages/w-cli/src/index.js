import { program } from 'commander';
import { registerAction } from './action/index.js';
import { version } from './constants/index.js';

export default function main() {
  program.version(version);
  registerAction(program);
  program.parse();
}
