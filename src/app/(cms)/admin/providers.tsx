'use client'

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

// TODO: Figure out a correct place to move these files
// ideally it should go into somewhere ~/components/admin-providers/
// but for now for the sake of collocation, I have added it here
export default function Providers({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
