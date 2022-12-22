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
  Spinner,
} from "@chakra-ui/react"
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import Pagination from "../../components/Pagination"
import Link from "next/link"
import Head from "next/head"

import { PencilLine, Plus } from "phosphor-react"

import { useQuery } from "react-query"
import { v4 as uuid } from "uuid"

type User = {
  createAt: string
  email: string
  id: string
  name: string
}

export default function UserList() {
  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery<User[]>(
    "users",
    async () => {
      const response = await fetch("/api/users")
      const data = await response.json()

      const users = data.users.map((user: User) => ({
        id: user.id,
        email: user.email,
        name: user.name,
        createAt: new Date(user.createAt).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      }))

      return users
    },
    {
      staleTime: 1000 * 5, // 5 seconds
    }
  )

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
          <Flex mb="8" justify="space-between" align="center">
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

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Unable to fetch the data</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha" key={uuid()}>
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
                  {data?.map((user) => (
                    <Tr key={uuid()}>
                      <Td px={"6"}>
                        <Checkbox colorScheme="pink" />
                      </Td>

                      <Td>
                        <Box>
                          <Text fontWeight="bold">{user.name}</Text>
                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>

                      {isDesktopSize && <Td>{user.createAt}</Td>}

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
                  ))}
                </Tbody>
              </Table>

              <Pagination />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}
