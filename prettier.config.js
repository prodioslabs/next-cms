/** @type {import('prettier').Config} */
const config = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 120,
  plugins: [require('prettier-plugin-tailwindcss')],
}

module.exports = config
