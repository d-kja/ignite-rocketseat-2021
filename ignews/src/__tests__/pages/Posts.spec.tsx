import { screen, render } from "@testing-library/react"

import Posts, { Post, getStaticProps } from "../../pages/posts"
import { getPrismicClient } from "../../services/prismic"

const posts: Post[] = [
  {
    title: "example-post-title",
    content: "example-post-content",
    slug: "example-post-slug",
    date: "example-post-date",
  },
]

jest.mock("../../services/prismic")

describe("page/posts", () => {
  it("should render", () => {
    render(<Posts posts={posts} />)
    expect(screen.getByText(posts[0].title)).toBeInTheDocument()
  })

  it("should load the static information", async () => {
    const prismicClientMocked = jest.mocked(getPrismicClient)
    prismicClientMocked.mockReturnValueOnce({
      getByType: jest.fn().mockResolvedValueOnce({
        results: [
          {
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
                },
              ],
            },
            last_publication_date: "2022-04-22T03:00:00.000Z",
          },
        ],
      }),
    } as any)

    const staticPropsResponse = await getStaticProps({})

    expect(staticPropsResponse).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "uid-example",
              title: "heading-example",
              content: "paragraph-example",
              date: "April 22, 2022",
            },
          ],
        },
      })
    )
  })
})
