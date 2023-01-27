import { render, screen } from "@testing-library/react"

import { PostLink, PostLinkProps } from "../../components/PostLink"

const postRef: PostLinkProps = {
  title: "title-example",
  content: "content-example",
  date: "date-example",
  href: "example-post",
}

describe("component/post-link", () => {
  it("should render", () => {
    render(<PostLink {...postRef} />)

    const postComponent = screen.getByText(postRef.title)
    expect(postComponent).toBeInTheDocument()
  })

  it("should have a valid url", () => {
    render(<PostLink {...postRef} />)

    const postComponent = screen.getByTestId("post-link")
    expect(postComponent).toHaveAttribute("href", `/posts/${postRef.href}`)
  })
})
