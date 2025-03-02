# Composio MCP

Composio MCP (Model Context Protocol) is a server implementation that provides standardized access to over 250 applications, enabling seamless integration for Agents, Large Language Models (LLMs), and Integrated Development Environments (IDEs). It facilitates structured interactions with tools such as Gmail, Linear, Notion, GitHub, Slack, and more, enhancing automation and reducing errors in AI-driven workflows.

## Features
- **Extensive Integrations**: Access a wide array of applications through fully managed MCP servers.
- **Managed Authentication**: Supports OAuth, API keys, JWT, and more, ensuring secure and straightforward connections.
- **Optimized Tool Accuracy**: Enhances function-calling precision, leading to reliable automation and minimized errors.

## Prerequisites

To get started, ensure you have the following:
- A Composio API key, obtainable by signing up at Composio.
- Node.js version 16 or higher.
- [pnpm](https://pnpm.io/) package manager.

## Usage

1. Visit the [Composio MCP Directory](https://mcp.composio.dev).
2. Select the tool of your choice.
3. Choose the MCP client that fits your needs.

### 1. Cursor

- Copy the SSE URL provided.
- Open Cursor Settings.
- Navigate to `Features` → `Add MCP Server`.
- Replace the SSE URL with the copied URL from the directory.
- Start using the tools with Cursor's Composer in agent mode.

### 2. Claude

- Copy the displayed npm command.
- Ensure Node.js is installed:
    
    ```bash
    node --version
    ```
    
- Run the copied command in your terminal. Example:
    
    ```bash
    npx composio-core@0.5.16 mcp "https://mcp.composio.dev/notion/30c7242b-9a14-45d2-bca7-5012dd77fc11" --client claude
    ```
        
- Restart Claude Desktop to apply changes.

## Contributing

Contributions are welcome! Please refer to the [CONTRIBUTING.md](https://github.com/ComposioHQ/composio-mcp-server/blob/master/CONTRIBUTING.md) file for guidelines on how to contribute.

## License

This project is licensed under the Apache-2.0 License. See the [LICENSE](https://github.com/ComposioHQ/composio-mcp-server/blob/master/LICENSE) file for details.

## Support & Contact

For assistance or inquiries:

- **Discord**: Join our community on Discord.
- **Documentation**: Access comprehensive guides at Composio Docs.
- **Email**: Contact us at support@composio.dev.

For more information, visit the [Composio MCP Landing Page](https://composio.dev/mcp/).

# Composio MCP CLI

A command-line interface (CLI) for configuring Claude, Cursor, and Windsurf with MCP servers.

## Installation

```bash
# Install globally
npm install -g composio-mcp-cli

# Or run directly with npx
npx composio-mcp-cli
```

## Usage

The CLI provides three commands for configuring different AI clients with MCP servers:

### Claude

Configure Claude desktop with an MCP server:

```bash
composio claude <url>
```

This will save the configuration to Claude's configuration file.

### Cursor

Configure Cursor with an MCP server:

```bash
composio cursor <url>
```

This will save the configuration to Cursor's configuration file.

### Windsurf

Configure Windsurf with an MCP server:

```bash
composio windsurf <url>
```

This will save the configuration to Windsurf's configuration file.

## Examples

```bash
# Configure Claude with an MCP server
composio claude https://example.com/mcp

# Configure Cursor with an MCP server
composio cursor https://example.com/mcp

# Configure Windsurf with an MCP server
composio windsurf https://example.com/mcp
```

## Development

This project uses Vite for building the CLI.

```bash
# Install dependencies
npm install

# Build the CLI
npm run build

# Run the CLI locally
npm start
```

## License

MIT

