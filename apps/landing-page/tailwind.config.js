/**
 * As this is a demo app present in the monorepo, we can use the tailwind.config.js
 * but in a real world scenario, you should not use it
 */
const config = require('@nextjs-cms/cms/tailwind.config')
config.content.push('../../packages/next-cms/src/**/*.{ts,tsx}')
module.exports = config
