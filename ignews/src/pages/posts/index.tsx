import type { GetStaticProps } from "next"

// Components
import Head from "next/head"
import { PostLink } from "../../components/PostLink"

// Client
import { getPrismicClient } from "../../services/prismic"
import { asText } from "@prismicio/helpers"

// Styling
import styles from "./styles.module.scss"

// Types
export interface Post {
  slug: string
  title: string
  content: string
  date: string
}

interface PostsProps {
  posts: Post[]
}

export default function Posts({ posts = [] }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(({ content, slug, title, date }) => (
            <PostLink
              content={content}
              href={slug}
              title={title}
              date={date}
              key={slug}
            />
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.getByType("publication", {
    fetch: ["publication.title", "publication.content"],
    pageSize: 100,
  })

  const posts: Post[] = response.results.map((post) => ({
    slug: post.uid,
    title: asText(post.data.title),
    content:
      post.data.content.find(
        (item) =>
          item.type === "paragraph" && item.text?.length > 0
      )?.text ?? "...",
    date: new Date(
      post.last_publication_date
    ).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  }))

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 * 24, // 24 hours,
  }
}
