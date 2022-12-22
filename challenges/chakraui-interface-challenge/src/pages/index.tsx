import Head from "next/head"

import { Box, Divider } from "@chakra-ui/react"
import { Header } from "../components/Header"
import { Banner } from "../components/Banner"
import { CategoryList } from "../components/CategoryList"
import { CTASlider } from "../components/CTASlider"

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Worldtrip</title>
      </Head>

      <Box as="main">
        <Banner />
        <Box my="20">
          <CategoryList />
        </Box>
        <Divider
          orientation="horizontal"
          variant="solid"
          borderColor="black"
          maxW="90px"
          mx="auto"
          mb="14"
        />
        <CTASlider />
      </Box>
    </>
  )
}
