import { Image, ImageProps } from "@chakra-ui/react"

interface LogoProps extends ImageProps {}

export const Logo = ({ ...props }: LogoProps) => {
  return (
    <Image
      src="/Images/logo.svg"
      h="full"
      alt="logo"
      {...props}
    />
  )
}
