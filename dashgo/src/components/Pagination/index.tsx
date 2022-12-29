import { Box, HStack, Stack, Text } from "@chakra-ui/react"
import PaginationButton from "./PaginationButton"

interface PaginationProps {
  currentPage?: number
  totalPages: number
  totalPerPage?: number
  onPageChange: (page: number) => void
  siblingsCount?: number
}
const generatePaginationArray = (from: number, to: number) =>
  [...new Array(to - from)]
    .map((_, index) => from + 1 + index)
    .filter((page) => page > 0)

export default function Pagination({
  totalPerPage = 10,
  currentPage = 1,
  onPageChange,
  totalPages,
  siblingsCount = 1,
}: PaginationProps) {
  const lastPage = Math.floor(totalPages / totalPerPage)

  const previousPages =
    currentPage > 1
      ? generatePaginationArray(
          currentPage - siblingsCount - 1,
          currentPage - 1
        )
      : []
  const nextPages =
    currentPage < lastPage
      ? generatePaginationArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : []

  return (
    <Stack
      direction={["column", "row"]}
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
        {currentPage > siblingsCount + 1 && (
          <>
            <PaginationButton onPageChange={onPageChange} pageNumber={1} />
            {currentPage > siblingsCount + 2 && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => (
            <PaginationButton
              onPageChange={onPageChange}
              key={page}
              pageNumber={page}
            />
          ))}
        <PaginationButton
          onPageChange={onPageChange}
          isCurrent
          pageNumber={currentPage}
        />
        {nextPages.length > 0 &&
          nextPages.map((page) => (
            <PaginationButton
              onPageChange={onPageChange}
              key={page}
              pageNumber={page}
            />
          ))}

        {siblingsCount + currentPage < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text color="gray.300" width="8" textAlign="center">
                ...
              </Text>
            )}
            <PaginationButton
              onPageChange={onPageChange}
              pageNumber={lastPage}
            />
          </>
        )}
      </HStack>
    </Stack>
  )
}
