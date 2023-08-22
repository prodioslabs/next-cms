import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'

export default defineConfig([
  {
    input: './src/server/index.ts',
    output: [
      {
        file: './server/index.js',
        format: 'cjs',
      },
      {
        file: './server/index.mjs',
        format: 'es',
      },
    ],
    plugins: [typescript()],
  },
  {
    input: './src/core/index.ts',
    output: [
      {
        file: './core/index.js',
        format: 'cjs',
      },
      {
        file: './core/index.mjs',
        format: 'es',
      },
    ],
    plugins: [typescript()],
  },
  {
    input: './src/plugins/index.ts',
    output: [
      {
        file: './plugins/index.js',
        format: 'cjs',
      },
      {
        file: './plugins/index.mjs',
        format: 'esm',
      },
    ],
    plugins: [
      typescript(),
      babel({
        babelHelpers: 'runtime',
        exclude: '**/node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
    ],
  },
  {
    input: './src/react/index.ts',
    output: [
      {
        file: './react/index.js',
        format: 'cjs',
      },
      {
        file: './react/index.mjs',
        format: 'esm',
      },
    ],
    plugins: [
      typescript(),
      babel({
        babelHelpers: 'runtime',
        exclude: '**/node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
    ],
  },
])
