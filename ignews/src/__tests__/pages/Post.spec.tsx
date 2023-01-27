import { screen, render } from "@testing-library/react"

import { getSession } from "next-auth/react"
import { getPrismicClient } from "../../services/prismic"
import Post, {
  getServerSideProps,
  Post as TPost,
} from "../../pages/posts/[slug]"

const postItem: TPost = {
  title: "example-post-title",
  content: "example-post-content",
  slug: "example-post-slug",
  time: "example-post-time",
}

jest.mock("next-auth/react")
jest.mock("../../services/prismic")

describe("page/post", () => {
  it("should render", () => {
    render(<Post post={postItem} />)
    expect(screen.getByText("example-post-title")).toBeInTheDocument()
  })

  it("should redirect user if he doesn't have an active subscription", async () => {
    const mockedSession = jest.mocked(getSession)
    mockedSession.mockReturnValueOnce({
      subscription: null,
    } as any)

    const getServerSideResponse = await getServerSideProps({
      req: {},
      params: { slug: postItem.slug },
    } as any)

    expect(getServerSideResponse).toEqual(
      expect.objectContaining({
        redirect: {
          destination: `/posts/${postItem.slug}/preview`,
          permanent: false,
        },
      })
    )
  })

  it("should load the server side information if user has subscription", async () => {
    const mockedSession = jest.mocked(getSession)
    mockedSession.mockReturnValueOnce({
      subscription: "subscription-example",
    } as any)

    const mockedPrismicClient = jest.mocked(getPrismicClient)
    mockedPrismicClient.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        uid: "uid-example",
        data: {
          title: [
            {
              type: "heading",
              text: "heading-example",
            },
          ],
          content: [
            {
              type: "paragraph",
              text: "paragraph-example",
              spans: [],
            },
          ],
        },
        last_publication_date: "2022-04-22T03:00:00.000Z",
      }),
    } as any)

    const getServerSideResponse = await getServerSideProps({
      req: {},
      params: { slug: postItem.slug },
    } as any)
    expect(getServerSideResponse).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "example-post-slug",
            title: "heading-example",
            content: "<p>paragraph-example</p>",
            time: "Apr 22, 2022",
          },
        },
      })
    )
  })
})
