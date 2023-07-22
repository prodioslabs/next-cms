'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { api, trpcClient } from '~/cms/server/api'
import { Toaster } from '~/components/ui/toaster'

const queryClient = new QueryClient()

// TODO: Figure out a correct place to move these files
// ideally it should go into somewhere ~/components/admin-providers/
// but for now for the sake of collocation, I have added it here
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <Toaster />
    </api.Provider>
  )
}
