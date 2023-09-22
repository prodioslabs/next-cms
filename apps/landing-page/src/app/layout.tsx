import { Inter } from 'next/font/google'
import './globals.css'
import '@nextjs-cms/cms/dist/styles.css'

export const dynamic = 'force-dynamic'

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
