import type { AppProps } from "next/app"

// Providers
import { QueryClientProvider, QueryClient } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { ChakraProvider } from "@chakra-ui/react"
import { SidebarDrawerProvider } from "../context/SidebarDrawerContext"

import { MakeServer } from "../services/miragejs"
import { theme } from "../styles/theme"

if (process.env.NODE_ENV === "development") {
  MakeServer()
}

const client = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
