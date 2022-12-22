import { Box, Flex, Image } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Logo } from "../Logo"

export const Header = () => {
  const { asPath, push } = useRouter()
  const isCountryPage = asPath.includes("/country")

  return (
    <Flex
      as="header"
      justify="center"
      align="center"
      position="relative"
      maxW={1240}
      mx="auto"
      py={{
        base: 15,
        lg: "27",
      }}
    >
      {isCountryPage && (
        <Box position="absolute" left={5}>
          <Link href="/">
            <Image src="/images/city-view/back-arrow.svg" />
          </Link>
        </Box>
      )}
      <Logo
        h={{
          base: "8",
          lg: 46,
        }}
      />
    </Flex>
  )
}
