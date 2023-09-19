import type { CMSConfig } from '@nextjs-cms/core'

export function createPluginHandler(config: CMSConfig<any, any>) {
  async function GET(request: Request, { params: { plugin } }: { params: { plugin: string } }) {
    for (const pluginConfig of config.plugins) {
      if (pluginConfig.name === plugin && pluginConfig.api?.method === 'GET') {
        return pluginConfig?.api?.handler(request)
      }
    }
    return new Response(JSON.stringify({ message: 'Not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async function POST(request: Request, { params: { plugin } }: { params: { plugin: string } }) {
    for (const pluginConfig of config.plugins) {
      if (pluginConfig.name === plugin && pluginConfig.api?.method === 'POST') {
        return pluginConfig?.api?.handler(request)
      }
    }
    return new Response(JSON.stringify({ message: 'Not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  return { GET, POST }
}
