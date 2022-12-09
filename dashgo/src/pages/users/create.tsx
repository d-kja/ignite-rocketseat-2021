import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react"

import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import InputWithLabel from "../../components/Form/InputWithLabel"

export default function CreateUser() {
  return (
    <Box>
      <Header />

      <Flex w="100%" maxW={1480} mx="auto" my="6" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Heading fontWeight="normal" size="lg">
            Create user
          </Heading>

          <Divider borderColor="gray.700" my="6" />

          <SimpleGrid
            w="100%"
            minChildWidth={240}
            spacing="8"
          >
            <InputWithLabel
              label="Name"
              type="text"
              id="name"
              name="name"
            />

            <InputWithLabel
              label="E-mail"
              type="email"
              id="email"
              name="email"
            />
          </SimpleGrid>

          <SimpleGrid
            w="100%"
            minChildWidth={240}
            spacing="8"
          >
            <InputWithLabel
              label="Password"
              type="password"
              id="password"
              name="password"
            />

            <InputWithLabel
              label="Confirm password"
              type="password"
              id="confirm_password"
              name="confirm_password"
            />
          </SimpleGrid>

          <Flex mt="8" justify="flex-end" gap="2">
            <Button type="button" colorScheme="whiteAlpha">
              Cancel
            </Button>
            <Button colorScheme="pink" type="submit">
              Save
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
