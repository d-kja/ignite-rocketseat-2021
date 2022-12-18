import Head from "next/head"

import { Box } from "@chakra-ui/react"
import { Header } from "../components/Header"
import { Banner } from "../components/Banner"

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Worldtrip</title>
      </Head>

      <Box as="main">
        <Header />
        <Banner />
        {/* Category/  */}
        {/* CTA/ */}
      </Box>
    </>
  )
}
