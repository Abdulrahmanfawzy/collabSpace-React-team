import { useState } from "react"
import type { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 60_000, retry: 3, refetchOnWindowFocus: false },
        },
      })
  )

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}