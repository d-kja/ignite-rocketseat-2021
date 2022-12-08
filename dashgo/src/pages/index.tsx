import { useRouter } from "next/router"

// Components
import { Button, Flex, Stack } from "@chakra-ui/react"
import InputWithLabel from "../components/Form/InputWithLabel"

export default function SignIn() {
  const router = useRouter()

  const handleSignIn = async () => {
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
        onSubmit={handleSignIn}
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
            name="email"
            type="email"
          />

          <InputWithLabel
            label="Password"
            name="password"
            type="password"
          />
        </Stack>

        <Button
          colorScheme="pink"
          mt="6"
          size="lg"
          type="submit"
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
