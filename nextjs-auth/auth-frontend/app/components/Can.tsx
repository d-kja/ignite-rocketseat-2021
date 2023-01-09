import React from "react"
import { useCan } from "../hooks/useCan"

interface CanProps {
  permissions?: string[]
  roles?: string[]
  children: React.ReactNode
}

export const Can = ({ permissions, roles, children }: CanProps) => {
  const canUserSeeComponent = useCan({ permissions, roles })

  if (!canUserSeeComponent) return null

  return <>{children}</>
}
