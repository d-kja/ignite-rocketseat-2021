import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react"

export interface InputProps extends ChakraInputProps {}

export default function Input({ ...props }: InputProps) {
  return (
    <ChakraInput
      {...props}
      variant="filled"
      size="lg"
      bg="gray.900"
      focusBorderColor="pink.500"
      _hover={{
        bg: "gray.900",
      }}
    />
  )
}
