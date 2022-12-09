import { Flex } from "@chakra-ui/react"

import Logo from "./Logo"
import NotificationsNav from "./NotificationsNav"
import ProfileNav from "./ProfileNav"
import SearchBar from "./SearchBar"

function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      align="center"
      justify="center"
      px="6"
    >
      <Logo />

      <SearchBar />

      <Flex align="center" ml="auto">
        <NotificationsNav />
        <ProfileNav />
      </Flex>
    </Flex>
  )
}

export default Header
