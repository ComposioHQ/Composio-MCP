/* eslint-disable no-console */
import chalk from 'chalk';
import { Command } from 'commander';
import fs from 'fs';
import os from 'os';
import path from 'path';

import { getOpenAPIClient } from '../sdk/utils/config';

type ErrorWithMessage = {
  message: string;
};

interface MCPConfig {
  command: string;
  args: string[];
}

interface CursorConfig {
  mcpServers: {
    [key: string]: MCPConfig;
  };
}

export default class CursorCommand {
  private program: Command;

  constructor(program: Command) {
    this.program = program;

    const command = this.program
      .command('cursor')
      .argument('<url>', 'The app to use')
      .description('Configure Cursor with an MCP server')
      .action(this.handleAction.bind(this));
  }

  private async handleAction(url: string): Promise<void> {
    getOpenAPIClient();

    try {
      console.log(chalk.cyan('📝 Configuration Details:'));
      console.log(`   URL: ${chalk.green(url)}`);
      console.log(`   Client: ${chalk.green('cursor')}\n`);

      const mcpUrl = url;
      const command = `npx -y supergateway --sse "${mcpUrl}"`;

      console.log(chalk.cyan('💾 Saving configurations...'));

      this.saveConfig(url, mcpUrl);

      console.log(
        chalk.cyan(
          `\n🚀 All done! Please restart cursor for changes to take effect\n`
        )
      );
    } catch (error) {
      console.log(chalk.red('\n❌ Error occurred while setting up MCP:'));
      console.log(chalk.red(`   ${(error as ErrorWithMessage).message}`));
      console.log(
        chalk.yellow(
          '\nPlease try again or contact support if the issue persists.\n'
        )
      );
      return;
    }
  }

  private saveConfig(url: string, mcpUrl: string): void {
    const config: MCPConfig = {
      command: 'npx',
      args: ['-y', 'supergateway', '--sse', mcpUrl],
    };

    let configDir;
    let configPath;

    if (os.platform() === 'darwin') {
      configDir = path.join(
        os.homedir(),
        'Library',
        'Application Support',
        'Cursor'
      );
      configPath = path.join(configDir, 'cursor_config.json');
    } else if (os.platform() === 'win32') {
      configDir = path.join(process.env.APPDATA || '', 'Cursor');
      configPath = path.join(configDir, 'cursor_config.json');
    } else {
      configDir = path.join(os.homedir(), '.config', 'Cursor');
      configPath = path.join(configDir, 'cursor_config.json');
    }

    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    let cursorConfig: CursorConfig = { mcpServers: {} };
    if (fs.existsSync(configPath)) {
      try {
        cursorConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        if (!cursorConfig.mcpServers) cursorConfig.mcpServers = {};
      } catch (error) {
        console.log(chalk.yellow('⚠️  Creating new config file'));
      }
    }

    cursorConfig.mcpServers[url] = config;
    fs.writeFileSync(configPath, JSON.stringify(cursorConfig, null, 2));
    console.log(chalk.green(`✅ Configuration saved to: ${configPath}`));
  }
} 