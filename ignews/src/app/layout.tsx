"use client"

import "../styles/global.scss"

import { useRouter } from "next/navigation"

// Components
import { Header } from "../components/Header"

export default function RootLayout({
  children,
  ...rest
}: {
  children: React.ReactNode
}) {
  const {} = useRouter()

  return (
    <html>
      <head>
        <title>Home | ig.news</title>
        <link
          rel="shortcut icon"
          href="/images/favicon.png"
        />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
