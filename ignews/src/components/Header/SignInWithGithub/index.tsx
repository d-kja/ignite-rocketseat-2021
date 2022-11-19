import { FaGithub } from "react-icons/fa"
import { FiX } from "react-icons/fi"

import styles from "./styles.module.scss"

import {
  useSession,
  signIn,
  signOut,
} from "next-auth/react"

export const SignInWithGithub = () => {
  const { data: session } = useSession()

  return session ? (
    <button
      type="button"
      className={styles.container}
      onClick={() => signOut()}
    >
      <FaGithub color="#04d361" />
      {session.user?.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.container}
      onClick={() => signIn("github")}
    >
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  )
}
