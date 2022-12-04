import Head from "next/head"
import { GetStaticProps, GetStaticPaths } from "next"

import { asHTML, asText } from "@prismicio/helpers"
import { getPrismicClient } from "../../../services/prismic"

import styles from "./styles.module.scss"
import Link from "next/link"
import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

type Post = {
  slug: string
  time: string
  title: string
  content: string
}
interface PostPreviewProps {
  post: Post
}

function PostPreview({ post }: PostPreviewProps) {
  const { data: session } = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (session && (session as any)?.subscription) {
      push(`/posts/${post.slug}`)
    }
  }, [post.slug, push, session])

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
            className={styles.preview}
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/" className={styles.subscribeNow}>
              Subscribe now 🤗
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async ({
  params,
}) => {
  const { slug } = params

  const prismic = getPrismicClient()
  const response = await prismic.getByUID(
    "publication",
    String(slug),
    {}
  )

  const post: Post = {
    slug: String(slug),
    title: asText(response.data.title),
    content: asHTML(response.data.content.splice(0, 3)),
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
    revalidate: 60 * 60 * 24 // 24 hours
  }
}

export default PostPreview
