import { NextResponse } from 'next/server'
import { CMSConfig } from '../types/config'

export function createPluginHandler(config: CMSConfig<any, any>) {
  async function GET(request: Request, { params: { plugin } }: { params: { plugin: string } }) {
    for (const pluginConfig of config.plugins) {
      if (pluginConfig.name === plugin && pluginConfig.api?.method === 'GET') {
        return pluginConfig?.api?.handler(request)
      }
    }
    return NextResponse.json({ message: 'Not found' }, { status: 404 })
  }

  async function POST(request: Request, { params: { plugin } }: { params: { plugin: string } }) {
    for (const pluginConfig of config.plugins) {
      if (pluginConfig.name === plugin && pluginConfig.api?.method === 'POST') {
        return pluginConfig?.api?.handler(request)
      }
    }
    return NextResponse.json({ message: 'Not found' }, { status: 404 })
  }

  return { GET, POST }
}
