import { render } from "@testing-library/react"

import { ActiveLink } from "../../../components/Header/ActiveLink/index"
import mockRouter from "next-router-mock"

jest.mock("next/router", () => require("next-router-mock"))
// jest.mock("next/router", () => {
//   return {
//     useRouter: () => {
//       return { pathname: "/", asPath: "/" }
//     },
//   }
// })

describe("component/active-link", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/")
  })

  it("should render", () => {
    const { debug, getByText } = render(
      <ActiveLink activeClassName="active" href={"/"}>
        <>...</>
      </ActiveLink>
    )

    debug() // it shows the html structure generated
    expect(getByText("...")).toBeInTheDocument()
  })

  it("should have 'active' class if path matches", () => {
    const { getByText } = render(
      <ActiveLink activeClassName="active" href={"/"}>
        <>...</>
      </ActiveLink>
    )

    expect(getByText("...")).toHaveClass("active")
  })
})
