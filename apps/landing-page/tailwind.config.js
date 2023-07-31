const config = require('tailwind-config/tailwind.config')
config.content.push('../../packages/ui/src/**/*.{ts,tsx}', '../../packages/next-cms/src/**/*.{ts,tsx}')
module.exports = config
