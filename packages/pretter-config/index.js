/** @type {import('prettier').Options} */
const config = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 120,
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindFunctions: ['cva', 'cn', 'clsx']
}

module.exports = config
