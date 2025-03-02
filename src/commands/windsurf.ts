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

interface WindsurfConfig {
  mcpServers: {
    [key: string]: MCPConfig;
  };
}

export default class WindsurfCommand {
  private program: Command;

  constructor(program: Command) {
    this.program = program;

    const command = this.program
      .command('windsurf')
      .argument('<url>', 'The app to use')
      .description('Configure Windsurf with an MCP server')
      .action(this.handleAction.bind(this));
  }

  private async handleAction(url: string): Promise<void> {
    getOpenAPIClient();

    try {
      console.log(chalk.cyan('📝 Configuration Details:'));
      console.log(`   URL: ${chalk.green(url)}`);
      console.log(`   Client: ${chalk.green('windsurf')}\n`);

      const mcpUrl = url;
      const command = `npx -y supergateway --sse "${mcpUrl}"`;

      console.log(chalk.cyan('💾 Saving configurations...'));

      this.saveConfig(url, mcpUrl);

      console.log(
        chalk.cyan(
          `\n🚀 All done! Please restart windsurf for changes to take effect\n`
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

    const configDir = path.join(os.homedir(), '.codeium', 'windsurf');
    const configPath = path.join(configDir, 'mcp_config.json');

    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    let windsurfConfig: WindsurfConfig = { mcpServers: {} };
    if (fs.existsSync(configPath)) {
      try {
        windsurfConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        if (!windsurfConfig.mcpServers) windsurfConfig.mcpServers = {};
      } catch (error) {
        console.log(chalk.yellow('⚠️  Creating new config file'));
      }
    }

    windsurfConfig.mcpServers[url] = config;
    fs.writeFileSync(configPath, JSON.stringify(windsurfConfig, null, 2));
    console.log(chalk.green(`✅ Configuration saved to: ${configPath}`));
  }
} 