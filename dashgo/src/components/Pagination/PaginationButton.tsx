import { Button } from "@chakra-ui/react"

interface PaginationButtonProps {
  isCurrent?: boolean
  pageNumber: number
  onPageChange: (pageNumber: number) => void
}

export default function PaginationButton({
  isCurrent = false,
  pageNumber,
  onPageChange,
}: PaginationButtonProps) {
  if (isCurrent) {
    return (
      <Button
        w="4"
        size="sm"
        fontSize="xs"
        colorScheme="pink"
        disabled
        _disabled={{
          bg: "pink.500",
          cursor: "default",
        }}
      >
        {pageNumber}
      </Button>
    )
  }

  return (
    <Button
      w="4"
      size="sm"
      fontSize="xs"
      bg="gray.700"
      _hover={{
        bg: "gray.500",
      }}
      onClick={() => onPageChange(pageNumber)}
    >
      {pageNumber}
    </Button>
  )
}
