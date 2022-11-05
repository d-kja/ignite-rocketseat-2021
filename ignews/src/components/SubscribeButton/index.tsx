import React from "react"

import styles from "./styles.module.scss"

interface SubscribeButtonProps {
  productId: string
}

export const SubscribeButton = ({
  productId,
}: SubscribeButtonProps) => {
  return (
    <button type="button" className={styles.container}>
      Subscribe now
    </button>
  )
}
