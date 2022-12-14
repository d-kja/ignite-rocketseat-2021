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
  useBreakpointValue,
  IconButton,
} from "@chakra-ui/react"
import { PencilLine, Plus } from "phosphor-react"

import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import Pagination from "../../components/Pagination"
import Link from "next/link"
import Head from "next/head"

export default function UserList() {
  const isDesktopSize = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Box>
      <Head>
        <title>Users | Dashgo.</title>
      </Head>
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

            <Link href="/users/create" passHref>
              <Button
                as="span"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={Plus} fontSize="18" />}
              >
                Create new
              </Button>
            </Link>
          </Flex>
          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th w={["6", "8"]} color="gray.300" px="6">
                  <Checkbox colorScheme="pink" />
                </Th>
                <Th>Users</Th>
                {isDesktopSize && <Th>Created at</Th>}
                <Th w={["6", "8"]}></Th>
              </Tr>
            </Thead>

            <Tbody>
              <Tr>
                <Td px={"6"}>
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

                {isDesktopSize && <Td>2022 April 4th</Td>}

                <Td>
                  {isDesktopSize ? (
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
                  ) : (
                    <IconButton
                      icon={
                        <Icon
                          as={PencilLine}
                          weight="fill"
                          fontSize="16"
                        />
                      }
                      aria-label="update user"
                      size="sm"
                      colorScheme="purple"
                    />
                  )}
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
