import { Box, Button, HStack, Text } from "@chakra-ui/react"
import PaginationButton from "./PaginationButton"

export default function Pagination() {
  return (
    <HStack
      spacing="6"
      justify="space-between"
      align="center"
      mt="8"
    >
      <Box>
        <Text as="span" fontWeight="bold">
          0
        </Text>
        {" - "}
        <Text as="span" fontWeight="bold">
          10
        </Text>
        {" out of "}
        <Text as="span" fontWeight="bold">
          100
        </Text>
      </Box>

      <HStack spacing="2">
        <PaginationButton isCurrent pageNumber={1} />
        <PaginationButton pageNumber={2} />
        <PaginationButton pageNumber={3} />
        <PaginationButton pageNumber={4} />
        <PaginationButton pageNumber={5} />
      </HStack>
    </HStack>
  )
}
