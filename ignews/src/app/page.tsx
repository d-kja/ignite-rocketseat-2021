import React from "react"

// Next cache config
export const revalidate = 60 * 60 * 24 // 24 hours

// Components
import { SubscribeButton } from "../components/SubscribeButton"

// Utils
import { stripe } from "../services/stripe"
import { priceFormatter } from "../utils/priceFormatter"

// Styling
import styles from "../styles/pages/home.module.scss"

// Types
interface Product {
  product: {
    id: string
    amount: number
  }
}

export const getProductPrice = async () => {
  const productResponse = await stripe.prices.retrieve(
    process.env.STRIPE_PRODUCT_ID,
    {
      expand: ["product"],
    }
  )

  const product = {
    id: productResponse.id,
    amount: productResponse.unit_amount / 100,
  }

  return product
}

export default async function Home() {
  const product = await getProductPrice()

  const formattedPrice = priceFormatter.format(
    product?.amount ?? 0
  )

  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <span>👏 Hey, welcome</span>
        <h1>
          News about <br /> the <span>React</span> world.
        </h1>

        <p>
          Get access to all the publications <br />
          <span>for {formattedPrice} month</span>
        </p>

        <SubscribeButton productId={product.id} />
      </section>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/Mulher.svg" alt="girl coding" />
    </main>
  )
}
