import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: [
        'commander',
        'chalk',
        'fs',
        'os',
        'path'
      ]
    },
    target: 'esnext',
    sourcemap: true,
    minify: false
  },
  plugins: [
    dts()
  ]
}); 