// TODO: Use correct port address from env
export const LOCAL_API = 'http://localhost:3000'
// TODO: Replace with your own production URL
export const API = process.env.NODE_ENV === 'development' ? LOCAL_API : 'https://your-production-url.com'

export function resolveUrl(relpath: string, basePath: string = LOCAL_API) {
  if (!relpath.startsWith('/')) {
    throw new Error('relative path should start with a string')
  }
  return `${basePath}${relpath}`
}
