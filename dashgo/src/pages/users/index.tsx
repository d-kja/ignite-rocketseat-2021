import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
  Text,
  Link,
} from "@chakra-ui/react"
import { PencilLine, Plus } from "phosphor-react"

import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import Pagination from "../../components/Pagination"

export default function UserList() {
  return (
    <Box>
      <Header />

      <Flex w="100%" maxW={1480} mx="auto" my="6" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex
            mb="8"
            justify="space-between"
            align="center"
          >
            <Heading size="lg" fontWeight="normal">
              Users
            </Heading>

            <Button
              as={Link}
              href="/users/create"
              size="sm"
              fontSize="sm"
              colorScheme="pink"
              leftIcon={<Icon as={Plus} fontSize="18" />}
            >
              Create new
            </Button>
          </Flex>
          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th w="8" color="gray.300" px="6">
                  <Checkbox colorScheme="pink" />
                </Th>
                <Th>Users</Th>
                <Th>Created at</Th>
                <Th w="8"></Th>
              </Tr>
            </Thead>

            <Tbody>
              <Tr>
                <Td px="6">
                  <Checkbox colorScheme="pink" />
                </Td>

                <Td>
                  <Box>
                    <Text fontWeight="bold">Nicolas</Text>
                    <Text fontSize="sm" color="gray.300">
                      nyyu.dev@gmail.com
                    </Text>
                  </Box>
                </Td>

                <Td>2022 April 4th</Td>

                <Td>
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="purple"
                    leftIcon={
                      <Icon
                        as={PencilLine}
                        weight="fill"
                        fontSize="16"
                      />
                    }
                  >
                    Change
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>

          <Pagination />
        </Box>
      </Flex>
    </Box>
  )
}
