import { useContext } from "react"
import { User, useAuthContext } from "../contexts/AuthContext"

interface UseCanParams {
  permissions?: string[]
  roles?: string[]
}

interface CanParams {
  permissions?: string[]
  roles?: string[]
  user?: Partial<User>
}

export function useCan({ permissions, roles }: UseCanParams) {
  const { isAuthenticated, user } = useAuthContext()

  if (!isAuthenticated) return false

  return checkPermissionsAndRoles({ permissions, roles, user })
}

export function checkPermissionsAndRoles({
  permissions,
  roles,
  user,
}: CanParams) {
  if (permissions?.length > 0) {
    const hasPermissions = permissions.every((permission) =>
      user?.permissions.includes(permission)
    )

    if (!hasPermissions) return false
  }
  if (roles?.length > 0) {
    const hasRoles = roles.some((role) => user?.roles.includes(role))

    if (!hasRoles) return false
  }

  return true
}
