import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['./src/server/index.ts'],
    target: 'es2019',
    outDir: './server',
    format: ['cjs', 'esm'],
    dts: true,
    watch: process.env.NODE_ENV === 'development',
  },
  {
    entry: ['./src/dashboard/index.ts'],
    target: 'es2019',
    outDir: './dashboard',
    format: ['cjs', 'esm'],
    dts: true,
    watch: process.env.NODE_ENV === 'development',
    banner: { js: '"use client";' },
  },
  {
    entry: ['./src/internal/index.ts'],
    target: 'es2019',
    outDir: './internal',
    format: ['cjs', 'esm'],
    dts: true,
    watch: process.env.NODE_ENV === 'development',
    banner: { js: '"use client";' },
  },
  {
    entry: ['./src/plugins/index.ts'],
    target: 'es2019',
    outDir: './plugins',
    format: ['cjs', 'esm'],
    dts: true,
    watch: process.env.NODE_ENV === 'development',
    banner: { js: '"use client";' },
  },
])
