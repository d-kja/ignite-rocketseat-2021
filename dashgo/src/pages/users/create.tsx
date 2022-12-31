import { useRouter } from "next/router"
import Link from "next/link"
import Head from "next/head"

import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react"
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { InputWithLabel } from "../../components/Form/InputWithLabel"

import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { reactQueryClient } from "../../services/reactQuery/client"
import { useMutation } from "react-query"
import { api } from "../../services/api"

interface CreateNewUserData {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

const createNewUserSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().required("E-mail is required").email("E-mail is invalid"),
  password: yup.string().required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "Passwords must match"),
})

export default function CreateUser() {
  const router = useRouter()
  const createUser = useMutation(
    async (user: CreateNewUserData) => {
      const response = await api.post("/users", {
        user: {
          ...user,
          create_at: new Date().toLocaleString(),
        },
      })

      return response.data.user
    },
    {
      onSuccess: () => {
        reactQueryClient.invalidateQueries("users")
      },
    }
  )
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateNewUserData>({
    resolver: yupResolver(createNewUserSchema),
  })

  const handleCreateUser: SubmitHandler<CreateNewUserData> = async (data) => {
    await createUser.mutateAsync(data)
    router.push("/users")
  }

  return (
    <Box>
      <Head>
        <title>Create user | Dashgo.</title>
      </Head>

      <Header />

      <Flex w="100%" maxW={1480} mx="auto" my="6" px="6">
        <Sidebar />

        <Box
          as="form"
          onSubmit={handleSubmit(handleCreateUser)}
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
        >
          <Heading fontWeight="normal" size="lg">
            Create user
          </Heading>

          <Divider borderColor="gray.700" my="6" />

          <Stack spacing={["6", "6", "0"]}>
            <SimpleGrid w="100%" minChildWidth={240} spacing={["6", "8"]}>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <InputWithLabel
                    label="Name"
                    type="text"
                    error={error}
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field, fieldState: { error } }) => (
                  <InputWithLabel
                    label="E-mail"
                    type="email"
                    error={error}
                    {...field}
                  />
                )}
              />
            </SimpleGrid>

            <SimpleGrid w="100%" minChildWidth={240} spacing={["6", "8"]}>
              <Controller
                control={control}
                name="password"
                render={({ field, fieldState: { error } }) => (
                  <InputWithLabel
                    label="Password"
                    type="password"
                    error={error}
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                name="passwordConfirmation"
                render={({ field, fieldState: { error } }) => (
                  <InputWithLabel
                    label="Confirm password"
                    type="password"
                    error={error}
                    {...field}
                  />
                )}
              />
            </SimpleGrid>
          </Stack>

          <Flex mt="8" justify="flex-end" gap="2">
            <Link href="/users">
              <Button type="button" colorScheme="whiteAlpha">
                Cancel
              </Button>
            </Link>
            <Button colorScheme="pink" type="submit" isLoading={isSubmitting}>
              Save
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
