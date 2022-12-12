import Link, { LinkProps } from "next/link"
import { useRouter } from "next/router"
import { cloneElement, ReactElement } from "react"

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
  shouldMatchExactPath?: boolean
}

export const ActiveLink = ({
  children,
  shouldMatchExactPath = false,
  ...props
}: ActiveLinkProps) => {
  const { asPath } = useRouter()
  let isActive = false
  if (
    shouldMatchExactPath &&
    (asPath === props.href || asPath === props.as)
  )
    isActive = true

  if (
    (!shouldMatchExactPath &&
      asPath.startsWith(String(props.href))) ||
    asPath.startsWith(String(props.as))
  )
    isActive = true

  return (
    <Link href={props.href}>
      {cloneElement(children, {
        color: isActive ? "pink.500" : "gray.50",
      })}
    </Link>
  )
}
