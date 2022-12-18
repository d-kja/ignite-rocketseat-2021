import {
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react"

export const Banner = () => {
  return (
    <Box
      bgImage="url('/Images/banner-background.png')"
      bgRepeat="no-repeat"
      bgSize="cover"
      maxH="350"
      color="gray.50"
      px="140"
      pt="20"
    >
      <Flex justify="space-between" alignItems="center">
        <Stack spacing="5">
          <Heading fontWeight="500">
            <Box>5 Continentes,</Box>
            <Box>infinitas possibilidades.</Box>
          </Heading>
          <Text>
            Chegou a hora de tirar do papel a viagem que
            voce sempre sonhou
          </Text>
        </Stack>
        <Image src="/Images/airplace.svg" />
      </Flex>
    </Box>
  )
}
