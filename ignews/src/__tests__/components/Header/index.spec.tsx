import { render, screen } from "@testing-library/react"

import { Header } from "../../../components/Header/index"

jest.mock("next/router", () => require("next-router-mock"))
jest.mock("next-auth/react", () => ({
  useSession: () => ({
    data: null,
    status: "unauthenticated",
  }),
}))

describe("HeaderComponent", () => {
  it("should render", () => {
    render(<Header />)
    expect(screen.getByText("Home")).toBeInTheDocument()
  })
})
