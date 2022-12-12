import { forwardRef, ForwardRefRenderFunction } from "react"
import {
  FormControl,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react"

interface InputWithLabelProps extends InputProps {
  label?: string
}

const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  InputWithLabelProps
> = ({ name, label, ...props }, ref) => {
  return (
    <FormControl>
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
    </FormControl>
  )
}

export const InputWithLabel = forwardRef(InputBase)
