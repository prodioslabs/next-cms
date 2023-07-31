import { defineConfig } from 'tsup'

export default defineConfig({
  target: 'es6',
  loader: {
    '.wasm': 'file',
  },
})
