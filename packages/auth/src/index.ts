import NextAuth, { getServerSession } from 'next-auth'
import type { NextAuthOptions, DefaultSession, Session } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { env } from './env'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    // TODO: Add include fields
    user: { id: string; email: string } & DefaultSession['user']
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/cms/admin/login',
    signOut: '/cms/admin/logout',
  },
  providers: [
    // @ts-expect-error: CredentialsProvider default export is an object on which `default` is a function
    (CredentialsProvider.default as typeof CredentialsProvider)({
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'abc@xyz.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials?.email === env.ADMIN_EMAIL && credentials?.password === env.ADMIN_PASSWORD) {
          return { id: credentials.email, email: credentials!.email }
        }
        return null
      },
    }),
  ],
}

/**
 * When "type" is set to "module" in "package.json", the "default" export is an object on which
 * "default" is a function. This is a workaround for esbuild to work with NextAuth.js.
 *
 * Read for more details:
 *  - https://github.com/nextauthjs/next-auth/issues/572
 *  - https://github.com/evanw/esbuild/issues/1719#issuecomment-953470495
 */
// @ts-expect-error: NextAuth default export is an object on which `default` is a function
const authHandler = (NextAuth.default as typeof NextAuth)(authOptions)

export { authOptions, authHandler, getServerSession, Session }
