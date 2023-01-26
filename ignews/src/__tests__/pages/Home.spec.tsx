import { screen, render, fireEvent } from "@testing-library/react"
import { useSession } from "next-auth/react"
import Home from "../../pages"

jest.mock("next-auth/react")

describe("home-page", () => {
  it("should render", () => {
    const useSessionMocked = jest.mocked(useSession)
    useSessionMocked.mockReturnValue({
      data: null,
      status: "unauthenticated",
    })

    render(<Home product={{ amount: 100, id: "fake-id" }} />)
    expect(screen.getByText(/\$100.00/i)).toBeInTheDocument()
  })
})
