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
    entry: ['./src/plugins/index.ts'],
    target: 'es2019',
    outDir: './plugins',
    format: ['cjs', 'esm'],
    dts: true,
    watch: process.env.NODE_ENV === 'development',
    banner: { js: '"use client";' },
  },
  {
    entry: ['./src/component/index.ts'],
    target: 'es2019',
    outDir: './component',
    format: ['cjs', 'esm'],
    dts: true,
    watch: process.env.NODE_ENV === 'development',
    external: ['@nextjs-cms/cms/core', '@nextjs-cms/cms/element'],
  },
])
