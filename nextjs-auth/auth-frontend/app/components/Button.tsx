import React, { ButtonHTMLAttributes, ElementType, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactElement
  invertIcon?: boolean
  children: ReactNode
  className?: string
}

export const Button = ({
  children,
  icon,
  invertIcon = false,
  className = "",
  ...props
}: ButtonProps) => {
  return !!icon ? (
    <button className={`btn ${className}`}>{children}</button>
  ) : (
    <div aria-label="button group" className="btn-group w-full">
      {!!icon && !invertIcon && <span>{icon}</span>}
      <button className={`btn ${className}`} {...props}>
        {children}
      </button>
      {!!icon && invertIcon && <span>{icon}</span>}
    </div>
  )
}
