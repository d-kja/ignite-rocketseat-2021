import Link, { LinkProps } from "next/link"
import { useRouter } from "next/router"
import React, { cloneElement, ReactElement } from "react"
import Styles from "../styles.module.scss"

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
  activeClassName: string
}

export const ActiveLink = ({
  children,
  activeClassName,
  ...props
}: ActiveLinkProps) => {
  const { pathname, asPath } = useRouter()

  const className =
    asPath === props.href ? activeClassName : ""

  return (
    <Link {...props} className={className}>
      {/* Repass properties like ClassName, Style or sth else */}
      {cloneElement(children, {
        style: {
          // Pass the values to the cloned component
        },
      })}
    </Link>
  )
}
