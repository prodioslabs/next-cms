import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['./src/core/index.ts'],
    target: 'es2019',
    outDir: './core',
    format: ['cjs', 'esm'],
    dts: true,
    watch: process.env.NODE_ENV === 'development',
  },
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
    entry: ['./src/react/index.ts'],
    target: 'es2019',
    outDir: './react',
    format: ['cjs', 'esm'],
    dts: true,
    watch: process.env.NODE_ENV === 'development',
  },
])
