import {
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react"

export const Banner = () => {
  const isScreenLarge = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Box maxH={335} color="gray.50" position="relative">
      <Flex
        justify={isScreenLarge ? "space-between" : "center"}
        alignItems="center"
        px={isScreenLarge ? "140" : "4"}
        py={isScreenLarge ? "5" : "7"}
        bgImage="url('/images/banner-background.png')"
        bgRepeat="no-repeat"
        bgSize="cover"
        flex="1"
      >
        <Stack spacing="5">
          <Heading
            fontWeight="500"
            fontSize={{
              base: 20,
              lg: 36,
            }}
          >
            <Box>5 Continentes,</Box>
            <Box>infinitas possibilidades.</Box>
          </Heading>
          <Text
            w={["100%", "85%"]}
            fontSize={{
              base: 14,
              lg: 20,
            }}
          >
            Chegou a hora de tirar do papel a viagem que voce sempre sonhou
          </Text>
        </Stack>
        {isScreenLarge && (
          <Image
            src="/images/airplane.png"
            alt="airplane"
            maxH="270"
            position="relative"
            bottom={-55}
          />
        )}
      </Flex>
    </Box>
  )
}
