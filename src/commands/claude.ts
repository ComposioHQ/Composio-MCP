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

export default class ClaudeCommand {
  private program: Command;

  constructor(program: Command) {
    this.program = program;

    const command = this.program
      .command('claude')
      .argument('<url>', 'The app to use')
      .description('Configure Claude with an MCP server')
      .action(this.handleAction.bind(this));
  }

  private async handleAction(url: string): Promise<void> {
    getOpenAPIClient();

    try {
      console.log(chalk.cyan('📝 Configuration Details:'));
      console.log(`   URL: ${chalk.green(url)}`);
      console.log(`   Client: ${chalk.green('claude')}\n`);

      const mcpUrl = url;
      const command = `npx -y supergateway --sse "${mcpUrl}"`;

      console.log(chalk.cyan('💾 Saving configurations...'));

      this.saveConfig(url, mcpUrl);

      console.log(
        chalk.cyan(
          `\n🚀 All done! Please restart claude for changes to take effect\n`
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
        'Claude'
      );
      configPath = path.join(configDir, 'claude_desktop_config.json');
    } else if (os.platform() === 'win32') {
      configDir = path.join(process.env.APPDATA || '', 'Claude');
      configPath = path.join(configDir, 'claude_desktop_config.json');
    } else {
      console.log(
        chalk.yellow(
          '\n⚠️  Claude Desktop is not supported on this platform.'
        )
      );
      return;
    }

    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    fs.writeFileSync(
      configPath,
      JSON.stringify(
        {
          mcpServers: { [url]: config },
        },
        null,
        2
      )
    );

    console.log(chalk.green(`✅ Configuration saved to: ${configPath}`));
  }
} 