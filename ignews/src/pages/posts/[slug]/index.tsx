import Head from "next/head"
import { GetServerSideProps } from "next"

import { getSession } from "next-auth/react"

import { asHTML, asText } from "@prismicio/helpers"
import { getPrismicClient } from "../../../services/prismic"

import styles from "./styles.module.scss"

type Post = {
  slug: string
  time: string
  title: string
  content: string
}
interface PostProps {
  post: Post
}

function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{`${post.title} | ig.news`}</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.content}>
          <h1> {post.title} </h1>
          <time> {post.time} </time>
          <div
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps =
  async ({ req, params }) => {
    const session = await getSession({
      req,
    })
    const { slug } = params

    const subscription = (session as any)?.subscription

    if (!subscription)
      return {
        redirect: {
          destination: `/posts/${slug}/preview`,
          permanent: false,
        },
      }

    const prismic = getPrismicClient(req)
    const response = await prismic.getByUID(
      "publication",
      String(slug),
      {}
    )

    const post: Post = {
      slug: String(slug),
      title: asText(response.data.title),
      content: asHTML(response.data.content),
      time: new Date(
        response.last_publication_date
      ).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    }

    return {
      props: {
        post,
      },
    }
  }

export default Post
