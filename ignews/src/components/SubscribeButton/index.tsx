import { signIn, useSession } from "next-auth/react"
import React from "react"

import styles from "./styles.module.scss"

interface SubscribeButtonProps {
  productId: string
}

export const SubscribeButton = ({
  productId,
}: SubscribeButtonProps) => {
  const { data: session } = useSession()
  const buttonText = session
    ? "Subscribe now"
    : "Sign in first!"

  const handleSubscribe = async () => {
    if (!session) {
      signIn("github")
      return
    }

    // fetch("http://localhost:3000/api/stripe/checkout
  }

  return (
    <button
      type="button"
      className={styles.container}
      onClick={handleSubscribe}
    >
      {buttonText}
    </button>
  )
}
