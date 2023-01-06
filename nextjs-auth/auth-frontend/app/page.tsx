import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// getServerSideProps
const handleFindToken = () => {
  const token = cookies().has("next-auth.token") // as I don't have the server-side-context imma use the new cookies function provided by the next

  /**
   * On the /pages/example-nookies I made the example using nookies as I couldn't find anything related to the new update on their docs/github
   */

  return token
}

export default async function Home() {
  const hasToken = handleFindToken()
  if (hasToken) redirect("/profile")

  return (
    <section
      aria-label="require login"
      className="container h-screen grid place-items-center px-2 md:px-0 mx-auto"
    >
      Login is needed
    </section>
  )
}
