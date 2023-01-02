import "./globals.css"
import { Form } from "./components/Form/Home/Form"

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
          <div
            aria-label="login form"
            className="h-full w-full flex items-center justify-center max-w-md bg-primary/10"
          >
            <Form />
          </div>
          {children}
        </main>
      </body>
    </html>
  )
}
