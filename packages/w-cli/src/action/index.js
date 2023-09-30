import create from './create.js';

export const ACTION_MAP = {
  create: {
    alias: 'c',
    description: 'Create a new project',
    action: create,
  },
};

/**
 *
 * @param {import('commander').Command} program
 */
export function registerAction(program) {
  Object.keys(ACTION_MAP).forEach((actionKey) => {
    const actionConfig = ACTION_MAP[actionKey];
    program
      .command(actionKey)
      .alias(actionConfig.alias)
      .description(actionConfig.description)
      .action(() => {
        actionConfig.action(...process.argv.slice(3));
      });
  });
}
