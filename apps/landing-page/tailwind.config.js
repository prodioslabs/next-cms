/**
 * As this is a demo app present in the monorepo, we can use the tailwind.config.js
 * but in a real world scenario, you should not use it
 */
/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
}

module.exports = config
