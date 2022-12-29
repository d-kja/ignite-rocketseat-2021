import type { AppProps } from "next/app"

// Providers
import { QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { ChakraProvider } from "@chakra-ui/react"
import { SidebarDrawerProvider } from "../context/SidebarDrawerContext"

import { reactQueryClient } from "../services/reactQuery/client"
import { MakeServer } from "../services/miragejs"
import { theme } from "../styles/theme"

if (process.env.NODE_ENV === "development") {
  MakeServer()
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <ChakraProvider resetCSS theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
