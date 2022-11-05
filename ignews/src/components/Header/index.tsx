import Image from "next/image"
import { useRouter } from "next/router"

import Logo from "../../../public/images/ig.news.svg"
import Styles from "./styles.module.scss"

import { SignInWithGithub } from "./SignInWithGithub"
import Link from "next/link"

export const Header = () => {
  const { pathname } = useRouter()

  return (
    <header className={Styles.headerContainer}>
      <div className={Styles.headerContent}>
        <Image
          src={Logo}
          alt="ig.news logo"
          loading="lazy"
        />
        <nav>
          <Link
            href="/"
            className={
              pathname === "/" ? Styles.active : ""
            }
          >
            Home
          </Link>
          <Link
            href="/posts"
            className={
              pathname === "/posts" ? Styles.active : ""
            }
          >
            Posts
          </Link>
        </nav>
        <SignInWithGithub />
      </div>
    </header>
  )
}
