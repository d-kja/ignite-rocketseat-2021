import { useRouter } from "next/router"

import {
  Controller,
  SubmitHandler,
  useForm,
} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

// Components
import { Button, Flex, Stack } from "@chakra-ui/react"
import { InputWithLabel } from "../components/Form/InputWithLabel"

type SignInFormData = {
  email: string
  password: string
}

const signInFormSchema = yup.object({
  email: yup
    .string()
    .required("E-mail is required")
    .email("E-mail is invalid"),
  password: yup.string().required("Password is required"),
})

export default function SignIn() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
    watch,
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(signInFormSchema),
  })

  const fields = watch()
  console.log("input values", fields)

  const handleSignIn: SubmitHandler<
    SignInFormData
  > = async (data) => {
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 2000)
    })

    router.push("/dashboard")
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      justify="center"
      align="center"
    >
      <Flex
        as="form"
        onSubmit={handleSubmit(handleSignIn)}
        w="100%"
        maxW="360px"
        bg="gray.800"
        borderRadius={8}
        direction="column"
        p="8"
      >
        <Stack spacing="4">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputWithLabel
                label="E-mail"
                type="email"
                error={error}
                {...field}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputWithLabel
                label="Password"
                type="password"
                error={error}
                {...field}
              />
            )}
          />
        </Stack>

        <Button
          colorScheme="pink"
          mt="6"
          size="lg"
          type="submit"
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
