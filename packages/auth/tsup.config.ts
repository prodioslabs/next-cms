import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['./src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
  },
  {
    entry: ['./src/react/index.ts'],
    format: ['cjs', 'esm'],
    outDir: './react',
    dts: true,
    clean: true,
  },
])
