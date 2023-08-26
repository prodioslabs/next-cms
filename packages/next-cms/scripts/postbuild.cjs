const fs = require('fs/promises')
const path = require('path')

async function main() {
  const content = await fs.readFile(path.resolve(__dirname, '../component/index.js'), 'utf-8')
  const updatedContent = content.replaceAll('@nextjs-cms/cms/', '../')
  await fs.writeFile(path.resolve(__dirname, '../component/index.js'), updatedContent)
}

main()
