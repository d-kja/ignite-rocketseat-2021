import { Flex, Icon, Input } from "@chakra-ui/react"
import { MagnifyingGlass } from "phosphor-react"

export default function SearchBar() {
  return (
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
      <Icon fontSize="22" my="auto" as={MagnifyingGlass} />
    </Flex>
  )
}
