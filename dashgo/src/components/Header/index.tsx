import {
  Flex,
  Icon,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react"
import { List } from "phosphor-react"
import { useSidebarDrawer } from "../../context/SidebarDrawerContext"

import Logo from "./Logo"
import NotificationsNav from "./NotificationsNav"
import ProfileNav from "./ProfileNav"
import SearchBar from "./SearchBar"

function Header() {
  const { onOpen } = useSidebarDrawer()
  const isDesktopSize = useBreakpointValue({
    base: false,
    lg: true,
  })

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
      {!isDesktopSize && (
        <IconButton
          icon={<Icon as={List} />}
          colorScheme="pink"
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          aria-label="Open navigation drawer"
          mr="2"
        />
      )}

      <Logo />

      {isDesktopSize && <SearchBar />}

      <Flex align="center" ml="auto">
        <NotificationsNav />
        <ProfileNav showProfileData={isDesktopSize} />
      </Flex>
    </Flex>
  )
}

export default Header
