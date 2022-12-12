import { Stack } from "@chakra-ui/react"
import NavLink from "./NavLink"
import NavSection from "./NavSection"

import {
  GitBranch,
  SquaresFour,
  Textbox,
  UserList,
} from "phosphor-react"

export const SidebarBody = () => {
  return (
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
        <NavLink href="/forms" icon={Textbox}>
          Forms
        </NavLink>
        <NavLink href="/automation" icon={GitBranch}>
          Automation
        </NavLink>
      </NavSection>
    </Stack>
  )
}
