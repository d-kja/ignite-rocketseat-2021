import { render, screen } from "@testing-library/react"

import { SignInWithGithub } from "../../../components/Header/SignInWithGithub"
import { useSession } from "next-auth/react"

jest.mock("next-auth/react")

describe("component/sign-in-with-github", () => {
  const mockedSession = jest.mocked(useSession)

  it("should render", () => {
    mockedSession.mockReturnValueOnce({ data: null, status: "unauthenticated" })

    const { debug } = render(<SignInWithGithub />)
    expect(screen.getByText("Sign in with Github")).toBeInTheDocument()
  })

  it("should update on session change", () => {
    mockedSession.mockReturnValueOnce({
      data: {
        user: {
          email: "bob@gmail.com",
          name: "Bob",
        },
        expires: "fake-expires",
      },
      status: "authenticated",
    })

    const { debug } = render(<SignInWithGithub />)
    expect(screen.getByText("Bob")).toBeInTheDocument()
  })
})
