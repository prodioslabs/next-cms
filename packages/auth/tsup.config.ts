import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['./src/index.ts'],
    dts: true,
    clean: true,
  },
  {
    entry: ['./src/react/index.ts'],
    outDir: './react',
    dts: true,
    clean: true,
  },
])
