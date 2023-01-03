import {
  ElementType,
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactElement,
} from "react"
import { ErrorOption } from "react-hook-form"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  className?: string
  error?: ErrorOption
  Icon?: ElementType
  IconFunction?: () => void
}

const BaseInput: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, name, className = "", Icon, IconFunction, error, ...props },
  ref
) => {
  return (
    <fieldset className="form-control" aria-label="input group">
      {!!label && (
        <div aria-label="label group" title="label group" className="label">
          <label className="label-text" htmlFor={name}>
            {label}
          </label>
        </div>
      )}

      <label className={`w-full ${Icon ? "input-group" : ""}`}>
        <input
          className={`input w-full ${className}`}
          id={name}
          name={name}
          {...props}
          ref={ref}
        />
        {!!Icon && (
          <span onClick={IconFunction}>
            <Icon />
          </span>
        )}
      </label>

      {!!error && (
        <div className="label" aria-label="error message">
          <span className="label-text-alt text-error">
            {error?.message ?? "Field required"}
          </span>
        </div>
      )}
    </fieldset>
  )
}

export const Input = forwardRef(BaseInput)
