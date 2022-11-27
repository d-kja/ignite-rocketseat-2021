import Image from "next/image"

import Logo from "../../../public/images/ig.news.svg"
import Styles from "./styles.module.scss"

import { SignInWithGithub } from "./SignInWithGithub"
import { ActiveLink } from "./ActiveLink"

export const Header = () => {
  return (
    <header className={Styles.headerContainer}>
      <div className={Styles.headerContent}>
        <Image
          src={Logo}
          alt="ig.news logo"
          loading="lazy"
        />
        <nav>
          <ActiveLink
            activeClassName={Styles.active}
            href="/"
          >
            <span>Home</span>
          </ActiveLink>
          <ActiveLink
            activeClassName={Styles.active}
            href="/posts"
          >
            <span>Posts</span>
          </ActiveLink>
        </nav>
        <SignInWithGithub />
      </div>
    </header>
  )
}
