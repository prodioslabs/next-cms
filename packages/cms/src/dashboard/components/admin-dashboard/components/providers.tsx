'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Session } from '@nextjs-cms/auth'
import { SessionProvider } from '@nextjs-cms/auth/react'
import { api, trpcClient } from '../../../../server/api'
import ThemeProvider from './theme-provider'
import { Toaster } from '../../../../ui/toaster'

const queryClient = new QueryClient()

// TODO: Figure out a correct place to move these files
// ideally it should go into somewhere ~/components/admin-providers/
// but for now for the sake of collocation, I have added it here
export default function Providers({ children, session }: { children: React.ReactNode; session: Session | null }) {
  return (
    <SessionProvider session={session} basePath="/cms/api/auth">
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </QueryClientProvider>
      </api.Provider>
    </SessionProvider>
  )
}
