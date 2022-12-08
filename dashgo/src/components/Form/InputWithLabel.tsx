import { FormControl, FormLabel } from "@chakra-ui/react"
import Input, { InputProps } from "./Input"

interface InputWithLabelProps extends InputProps {
  label?: string
}

export default function InputWithLabel({
  name,
  label,
  ...props
}: InputWithLabelProps) {
  return (
    <FormControl>
      {!!label && (
        <FormLabel htmlFor={name}>{label}</FormLabel>
      )}
      <Input name="password" id={name} {...props} />
    </FormControl>
  )
}
