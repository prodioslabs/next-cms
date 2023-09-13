import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['./src/index.ts'],
    format: ['cjs', 'esm'],
    clean: true,
  },
  {
    entry: ['./src/react/index.ts'],
    format: ['cjs', 'esm'],
    outDir: './react',
    clean: true,
  },
])
