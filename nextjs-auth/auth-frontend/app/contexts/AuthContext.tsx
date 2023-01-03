"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { useRouter } from "next/navigation"

import { setCookie } from "nookies"

import { api } from "../services/api"

export interface AuthContextProps {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => Promise<void>
  isAuthenticated: boolean
  user: Partial<User>
}
export interface AuthProviderProps {
  children: ReactNode
}

type SignInCredentials = {
  email: string
  password: string
}
type User = {
  email: string
  permissions: string[]
  roles: string[]
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter()

  const [user, setUser] = useState<Partial<User>>({})
  const isAuthenticated = !!user?.email

  console.log("auth", isAuthenticated, "user", user)

  const handleSignIn = async (credentials: SignInCredentials) => {
    try {
      const response = await api.post("/sessions", credentials)

      const { permissions, roles, token, refreshToken } = response?.data

      setCookie(undefined, "next-auth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/", // global path
      })
      setCookie(undefined, "next-auth.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/", // global path
      })

      setUser({
        email: credentials.email,
        permissions,
        roles,
      })

      console.log(response.data)
      router.push("/profile")
    } catch (error) {
      console.error(error)
    }
  }
  const handleSignOut = async () => {}

  return (
    <AuthContext.Provider
      value={{
        signIn: handleSignIn,
        signOut: handleSignOut,
        isAuthenticated,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
