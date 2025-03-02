#!/usr/bin/env node
/* eslint-disable no-console */
import chalk from 'chalk';
import { Command } from 'commander';

import ClaudeCommand from './commands/claude';
import CursorCommand from './commands/cursor';
import WindsurfCommand from './commands/windsurf';

// Setup the CLI program
const program = new Command();

program
  .name('composio')
  .description('Composio MCP CLI for configuring AI clients')
  .version('1.0.0')
  .showHelpAfterError(true);

// Register all commands
new ClaudeCommand(program);
new CursorCommand(program);
new WindsurfCommand(program);

// Display a helpful message if no commands are provided
program.on('command:*', () => {
  console.error(chalk.red('Invalid command: %s'), program.args.join(' '));
  console.log();
  console.log(`Run ${chalk.cyan('composio --help')} for usage information.`);
  process.exit(1);
});

// Parse the arguments and execute the appropriate command
program.parse();

// If no arguments provided, show help
if (!process.argv.slice(2).length) {
  console.log(chalk.cyan('\nComposio MCP CLI 1.0.0'));
  console.log(chalk.yellow('\nAvailable commands:'));
  console.log(chalk.green('  claude <url>') + '    Configure Claude with an MCP server');
  console.log(chalk.green('  cursor <url>') + '    Configure Cursor with an MCP server');
  console.log(chalk.green('  windsurf <url>') + '  Configure Windsurf with an MCP server');
  console.log();
  console.log(`Run ${chalk.cyan('composio <command> --help')} for detailed usage information.`);
  process.exit(0);
} 