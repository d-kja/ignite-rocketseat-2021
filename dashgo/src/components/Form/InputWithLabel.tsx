import { forwardRef, ForwardRefRenderFunction } from "react"
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react"
import { FieldError } from "react-hook-form"

interface InputWithLabelProps extends InputProps {
  label?: string
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  InputWithLabelProps
> = ({ name, label, error = null, ...props }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name}>{label}</FormLabel>
      )}
      <Input
        variant="filled"
        size="lg"
        bg="gray.900"
        focusBorderColor="pink.500"
        _hover={{
          bg: "gray.900",
        }}
        {...props}
        ref={ref}
      />

      {!!error && (
        <FormErrorMessage>
          {error?.message}
        </FormErrorMessage>
      )}
    </FormControl>
  )
}

export const InputWithLabel = forwardRef(InputBase)
