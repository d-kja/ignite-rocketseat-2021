import Link from "next/link"
import { AiOutlineClockCircle } from "react-icons/ai"

import styles from "./styles.module.scss"

export interface PostLinkProps {
  href: string
  title: string
  content: string
  date: string
}

export const PostLink = ({
  content,
  date,
  href,
  title,
}: PostLinkProps) => {
  return (
    <Link href={`/posts/${href}`} className={styles.Post}>
      <time>
        <AiOutlineClockCircle /> {date}
      </time>

      <strong>{title}</strong>
      <p>{content}</p>
    </Link>
  )
}
