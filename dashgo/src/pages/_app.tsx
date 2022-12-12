import type { AppProps } from "next/app"

// Providers
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../styles/theme"
import { SidebarDrawerProvider } from "../context/SidebarDrawerContext"

export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <>
      <ChakraProvider resetCSS theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>
    </>
  )
}
