import "./globals.css"
import { Form } from "./components/Form/Home/Form"
import { AuthProvider } from "./contexts/AuthContext"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <main className="h-screen flex items-center justify-center">
          <AuthProvider>
            <div
              aria-label="login form"
              className="h-full w-full flex items-center justify-center max-w-md bg-primary/10"
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
