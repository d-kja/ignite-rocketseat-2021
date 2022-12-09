import { HStack, Icon } from "@chakra-ui/react"
import { Bell, UserPlus } from "phosphor-react"

export default function NotificationsNav() {
  return (
    <HStack
      spacing="8"
      mx="8"
      pr="8"
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <Icon as={Bell} fontSize="22" />
      <Icon as={UserPlus} fontSize="22" />
    </HStack>
  )
}
