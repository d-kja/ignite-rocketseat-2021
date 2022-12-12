import { Avatar, Box, Flex, Text } from "@chakra-ui/react"

interface ProfileNavProps {
  showProfileData?: boolean
}

export default function ProfileNav({
  showProfileData = false,
}: ProfileNavProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Nicolas (Nyyu)</Text>
          <Text color="gray.300" fontSize="sm">
            nyyu.dev@gmail.com
          </Text>
        </Box>
      )}
      <Avatar
        size="md"
        name="name"
        src="https://github.com/nyyu.png"
      />
    </Flex>
  )
}
