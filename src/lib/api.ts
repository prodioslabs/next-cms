import { env } from '~/env'

// TODO: Use correct port address from env
export const LOCAL_API_BASE_URL = 'http://localhost:3000'
// TODO: Replace with your own production URL
export const API_BASE_URL = env.NODE_ENV === 'development' ? LOCAL_API_BASE_URL : 'https://your-production-url.com'

export function resolveUrl(relpath: string, basePath: string = LOCAL_API_BASE_URL) {
  if (!relpath.startsWith('/')) {
    throw new Error('relative path should start with a string')
  }
  return `${basePath}${relpath}`
}
