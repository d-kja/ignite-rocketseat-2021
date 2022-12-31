import { useState } from "react"

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
  Stack,
  Link as ChakraLink,
} from "@chakra-ui/react"
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import Pagination from "../../components/Pagination"
import Link from "next/link"
import Head from "next/head"

import { ArrowsClockwise, PencilLine, Plus } from "phosphor-react"

import {
  getUsers,
  getUsersResponse,
  useUsers,
} from "../../services/hooks/users/useUsers"
import { v4 as uuid } from "uuid"
import { api } from "../../services/api"
import { reactQueryClient } from "../../services/reactQuery/client"
import { GetServerSideProps } from "next"

interface UserListProps extends getUsersResponse {}

export default function UserList({}: UserListProps) {
  const [page, setPage] = useState(1)
  const { data, isLoading, error, refetch, isFetching } = useUsers({
    page,
    // options: {
    //   initialData: users,
    // },
  })

  const isDesktopSize = useBreakpointValue({
    base: false,
    lg: true,
  })

  const handlePrefetchUserQuery = async (id: number) => {
    await reactQueryClient.prefetchQuery(
      ["user", id],
      async () => await handleFetchUser(id),
      {
        staleTime: 1000 * 60 * 30,
      }
    )
  }

  const handleFetchUser = async (id: number) => {
    const response = await api.get(`/users/${id}`)
    return response.data
  }

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

            <Stack direction="row">
              <Button
                as="span"
                size="sm"
                fontSize="sm"
                colorScheme="purple"
                _hover={{
                  cursor: "pointer",
                }}
                onClick={() => refetch()}
                leftIcon={
                  !isLoading && isFetching ? (
                    <Spinner size="sm" />
                  ) : (
                    <Icon as={ArrowsClockwise} fontSize="18" />
                  )
                }
              >
                Reload
              </Button>

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
            </Stack>
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
                  {data?.users?.map((user) => (
                    <Tr key={uuid()}>
                      <Td px={"6"}>
                        <Checkbox colorScheme="pink" />
                      </Td>

                      <Td>
                        <Box>
                          <ChakraLink
                            color={"purple.500"}
                            onMouseEnter={() =>
                              handlePrefetchUserQuery(Number(user.id))
                            }
                          >
                            <Text fontWeight="bold">{user.name}</Text>
                          </ChakraLink>
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

              <Pagination
                onPageChange={setPage}
                totalPages={data.totalCount}
                currentPage={page}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { users, totalCount } = await getUsers({ page: 1 })
  } catch (error) {
    console.log(error)
  }

  return {
    props: {
      // users,
      // totalCount,
    },
  }
}
