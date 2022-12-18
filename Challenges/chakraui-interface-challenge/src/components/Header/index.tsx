import { Flex } from "@chakra-ui/react"
import { Logo } from "../Logo"

export const Header = () => {
  return (
    <Flex
      as="header"
      justify="center"
      align="center"
      py="27"
    >
      <Logo h={46} />
    </Flex>
  )
}
