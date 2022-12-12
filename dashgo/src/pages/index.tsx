import { useRouter } from "next/router"
import { SubmitHandler, useForm } from "react-hook-form"

// Components
import { Button, Flex, Stack } from "@chakra-ui/react"
import { InputWithLabel } from "../components/Form/InputWithLabel"

type SignInFormData = {
  email: string
  password: string
}

export default function SignIn() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>()

  const handleSignIn: SubmitHandler<
    SignInFormData
  > = async (data) => {
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 2000)
    })

    // router.push("/dashboard")
    console.log(data)
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
          <InputWithLabel
            label="E-mail"
            type="email"
            {...register("email")}
          />

          <InputWithLabel
            label="Password"
            type="password"
            {...register("password")}
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
