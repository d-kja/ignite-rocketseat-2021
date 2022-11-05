import { FaGithub } from "react-icons/fa"
import { FiX } from "react-icons/fi"

import styles from "./styles.module.scss"

export const SignInWithGithub = ({ userName = "User" }) => {
  const isUserLogged = false

  return isUserLogged ? (
    <button
      type="button"
      className={styles.container}
      onClick={() => {}}
    >
      <FaGithub color="#04d361" />
      {userName}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.container}
      onClick={() => {}}
    >
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  )
}
