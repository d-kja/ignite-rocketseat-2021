import { ElementType } from "react"
import { Icon, Link, Text } from "@chakra-ui/react"

import type { LinkProps } from "@chakra-ui/react"

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
    <Link display="flex" alignItems="center" {...props}>
      <Icon as={icon} fontSize="22" />
      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </Link>
  )
}
