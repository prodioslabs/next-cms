import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'

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
    plugins: [typescript()],
  },
])
