import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { api } from "../../services/api"
import { loadStripeJs } from "../../services/stripe-js"

import styles from "./styles.module.scss"

export const SubscribeButton = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { data: session } = useSession()
  const router = useRouter()
  const buttonText = session ? "Subscribe now" : "Sign in first!"

  const handleSubscribe = async () => {
    if (!session) {
      signIn("github")
      return
    }

    if ((session as any)?.subscription) {
      router.push("/posts")
      return
    }

    try {
      setLoading(true)

      const response = await api.post("/stripe/checkout")
      const { sessionId } = response.data

      const stripe = await loadStripeJs()
      await stripe.redirectToCheckout({
        sessionId,
      })
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  return (
    <button
      disabled={loading}
      type="button"
      className={styles.container}
      onClick={handleSubscribe}
    >
      {loading ? "Loading..." : buttonText}
    </button>
  )
}
