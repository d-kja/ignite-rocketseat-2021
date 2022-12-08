import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react"
import {
  MagnifyingGlass,
  Bell,
  UserPlus,
} from "phosphor-react"

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
      <Text
        fontSize="3xl"
        fontWeight="bold"
        letterSpacing="tight"
        w="64"
      >
        Dashgo
        <Text color="pink.500" as="span" ml="1">
          .
        </Text>
      </Text>

      <Flex
        as="label"
        flex="1"
        py="4"
        px="8"
        ml="6"
        maxW={400}
        alignSelf="center"
        color="gray.200"
        position="relative"
        bg="gray.800"
        rounded="full"
      >
        <Input
          color="gray.50"
          variant="unstyled"
          placeholder="Search"
          _placeholder={{
            color: "gray.400",
          }}
          px="4"
          mr="4"
        />
        <Icon
          fontSize="22"
          my="auto"
          as={MagnifyingGlass}
        />
      </Flex>

      <Flex align="center" ml="auto">
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

        <Flex align="center">
          <Box mr="4" textAlign="right">
            <Text>Nicolas (Nyyu)</Text>
            <Text color="gray.300" fontSize="sm">
              nyyu.dev@gmail.com
            </Text>
          </Box>
          <Avatar
            size="md"
            name="name"
            src="https://github.com/nyyu.png"
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Header
