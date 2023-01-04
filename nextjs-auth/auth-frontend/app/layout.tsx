"use client"

import "./globals.css"
import { Form } from "./components/Form/Home/Form"
import { AuthProvider } from "./contexts/AuthContext"

import { useEffect, useState } from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted)
    return (
      <html>
        <head />
        <body></body>
      </html>
    )

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <main className="h-screen flex flex-col md:flex-row items-center justify-center">
          <AuthProvider>
            <div
              aria-label="login form"
              className="h-full w-full flex items-center justify-center md:max-w-md bg-primary/10"
            >
              <Form />
            </div>
            {children}
          </AuthProvider>
        </main>
      </body>
    </html>
  )
}
