#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
pnpm install

# Fix TypeScript errors by installing necessary type declarations
echo "Installing TypeScript type declarations..."
pnpm install -D @types/node

# Build the project
echo "Building the project..."
pnpm run build

# Make the script executable
chmod +x dist/index.js

echo "Initialization complete!"
echo "Run 'pnpm start' to test the CLI, or 'pnpm link' to install it globally." 