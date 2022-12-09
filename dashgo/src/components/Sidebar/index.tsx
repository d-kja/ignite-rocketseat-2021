import {
  Box,
  Icon,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react"
import {
  SquaresFour,
  UserList,
  Textbox,
  GitBranch,
} from "phosphor-react"
import NavLink from "./NavLink"
import NavSection from "./NavSection"

export default function Sidebar() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <NavSection title="GENERAL">
          <NavLink href="/dashboard" icon={SquaresFour}>
            Dashboard
          </NavLink>
          <NavLink href="/users" icon={UserList}>
            Users
          </NavLink>
        </NavSection>

        <NavSection title="AUTOMATION">
          <NavLink href="/" icon={Textbox}>
            Forms
          </NavLink>
          <NavLink href="/" icon={GitBranch}>
            Automation
          </NavLink>
        </NavSection>
      </Stack>
    </Box>
  )
}
