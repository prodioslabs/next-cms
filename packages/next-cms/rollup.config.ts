import { defineConfig } from 'rollup'

export default defineConfig([
  {
    input: './src/server/index.ts',
    external: ['react-dom'],
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
  },
])
