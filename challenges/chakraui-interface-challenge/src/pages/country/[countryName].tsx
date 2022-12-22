import { Flex, Image } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"

const Contry = () => {
  const {
    query: { countryName },
  } = useRouter()
  return (
    <>
      <Image
        src="/images/city-view/Banner.png"
        w="full"
        maxH="400"
        objectFit="cover"
        objectPosition="center"
        alt="city view"
        filter="brightness(0.85)"
      />
    </>
  )
}

export default Contry
