import { fireEvent, render, screen } from "@testing-library/react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { SubscribeButton } from "../../components/SubscribeButton"

jest.mock("next-auth/react")
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

describe("subscribe-button-component", () => {
  it("should render", () => {
    const useSessionMocked = jest.mocked(useSession)
    useSessionMocked.mockReturnValueOnce({
      data: {
        expires: "",
        user: {
          email: "foo@bar.com",
          name: "Foo",
        },
      },
      status: "authenticated",
    })

    render(<SubscribeButton />)
    expect(screen.getByText("Subscribe now")).toBeInTheDocument()
  })

  it("should redirect when user isn't authenticated", () => {
    const useSessionMocked = jest.mocked(useSession)
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    })

    render(<SubscribeButton />)

    const signInMocked = jest.mocked(signIn)
    const subscribeButtonRef = screen.getByText("Sign in first!")

    fireEvent.click(subscribeButtonRef)
    expect(signInMocked).toHaveBeenCalled()
  })

  it("should redirect to route /post when user has an active subscription", () => {
    const useSessionMocked = jest.mocked(useSession)
    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          email: "bob@gmail.com",
          name: "Bob",
        },
        expires: "fake-expires",
        subscription: "something-here",
      },
      status: "authenticated",
    } as any)

    const mockedPush = jest.fn()
    const useRouterMocked = jest.mocked(useRouter)

    useRouterMocked.mockReturnValueOnce({
      push: mockedPush,
    } as any)

    render(<SubscribeButton />)
    const subscribeButtonRef = screen.getByText("Subscribe now")
    fireEvent.click(subscribeButtonRef)

    expect(mockedPush).toHaveBeenCalledWith("/posts")
  })
})
