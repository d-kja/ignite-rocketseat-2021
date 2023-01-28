import { screen, render } from "@testing-library/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import PostPreview, {
  getStaticPaths,
  getStaticProps,
} from "../../pages/posts/[slug]/preview"
import { getPrismicClient } from "../../services/prismic"

jest.mock("next-auth/react")
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))
jest.mock("../../services/prismic")

const postItem = {
  title: "example-post-title",
  content: "example-post-content",
  slug: "example-post-slug",
  time: "example-post-time",
}

describe("page/post-preview", () => {
  it("should render", () => {
    const mockedSession = jest.mocked(useSession)
    const mockedRouter = jest.mocked(useRouter)

    mockedSession.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    })
    mockedRouter.mockReturnValueOnce({
      push: jest.fn(),
    } as any)

    render(<PostPreview post={postItem} />)
    expect(screen.getByText(postItem.title)).toBeInTheDocument()
  })

  it("should redirect if user has an active subscription", () => {
    const mockedSession = jest.mocked(useSession)
    const mockedRouter = jest.mocked(useRouter)
    const mockedPush = jest.fn()

    mockedSession.mockReturnValueOnce({
      data: {
        user: {},
        expires: "expires-example",
        subscription: "subscription-example",
      },
      status: "authenticated",
    } as any)
    mockedRouter.mockReturnValueOnce({
      push: mockedPush,
    } as any)

    render(<PostPreview post={postItem} />)

    expect(mockedPush).toHaveBeenCalledWith(`/posts/${postItem.slug}`)
  })

  it("loads the static data", async () => {
    const mockedPrismicClient = jest.mocked(getPrismicClient)
    mockedPrismicClient.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
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
        last_publication_date: new Date().toISOString(),
      }),
    } as any)

    const getStaticPropsResponse = await getStaticProps({
      params: { slug: postItem.slug },
    })
    new Date().toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    expect(getStaticPropsResponse).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "example-post-slug",
            title: "heading-example",
            content: "<p>paragraph-example</p>",
            time: new Date().toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
          },
        },
      })
    )
  })
})
