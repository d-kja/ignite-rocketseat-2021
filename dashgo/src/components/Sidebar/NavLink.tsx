import { ElementType } from "react"

import { Icon, Link, Text } from "@chakra-ui/react"
import { ActiveLink } from "../ActiveLink"
import { LinkProps } from "next/link"

interface NavLinkProps extends LinkProps {
  children: string
  icon: ElementType
}

export default function NavLink({
  icon,
  children,
  ...props
}: NavLinkProps) {
  return (
    <ActiveLink {...props} prefetch>
      <Link alignItems="center" display="flex">
        <Icon as={icon} fontSize="22" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </Link>
    </ActiveLink>
  )
}
