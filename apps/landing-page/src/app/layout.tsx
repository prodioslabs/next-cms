import { Inter } from 'next/font/google'
/**
 * As this is a demo app in the same monorepo, we can import the tailwind styles directly.
 * But in the real world, you should import the styles from the package:
 * import '@nextjs-cms/cms/dist/styles.css'
 */
import '@nextjs-cms/cms/styles.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo-light.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
