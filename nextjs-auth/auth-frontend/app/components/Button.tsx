import React, { ButtonHTMLAttributes, ElementType, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ElementType
  invertIcon?: boolean
  children: ReactNode
  className?: string
}

export const Button = ({
  children,
  icon,
  invertIcon = false,
  className = "",
}: ButtonProps) => {
  return !!icon ? (
    <button className={`btn ${className}`}>{children}</button>
  ) : (
    <div aria-label="button group" className="btn-group w-full">
      {!!icon && !invertIcon && <span className="">{icon}</span>}
      <button className={`btn ${className}`}>{children}</button>
      {!!icon && invertIcon && <span className="">{icon}</span>}
    </div>
  )
}
