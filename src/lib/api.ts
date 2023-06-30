// TODO: Replace with your own production URL
export const API = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://your-production-url.com'

export function resolveUrl(relpath: string, basePath: string = API) {
  if (!relpath.startsWith('/')) {
    throw new Error('relative path should start with a string')
  }
  return `${basePath}${relpath}`
}
