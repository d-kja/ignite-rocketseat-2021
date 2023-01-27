import { screen, render } from "@testing-library/react"
import { useSession } from "next-auth/react"

import Home, { getStaticProps } from "../../pages"
import { stripe } from "../../services/stripe"

jest.mock("next-auth/react")
jest.mock("../../services/stripe")

describe("page/home", () => {
  it("should render", () => {
    const useSessionMocked = jest.mocked(useSession)
    useSessionMocked.mockReturnValue({
      data: null,
      status: "unauthenticated",
    })

    render(<Home product={{ amount: 100, id: "fake-id" }} />)
    expect(screen.getByText(/\$100.00/i)).toBeInTheDocument()
  })

  it("should load the static information", async () => {
    const retrieveStripePricesFnMocked = jest.mocked(stripe.prices.retrieve)
    retrieveStripePricesFnMocked.mockResolvedValueOnce({
      id: "example-id",
      unit_amount: 1000,
    } as any)

    const staticPropsResponse = await getStaticProps({})
    // toEqual -> compare as a whole
    expect(staticPropsResponse).toEqual(
      // objectContaining -> just the specific properties
      expect.objectContaining({
        props: { product: { id: "example-id", amount: 10 } },
      })
    )
  })
})
