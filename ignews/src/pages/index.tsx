import { GetStaticProps } from "next"
import Head from "next/head"
import { SubscribeButton } from "../components/SubscribeButton"
import { stripe } from "../services/stripe"

import styles from "../styles/pages/home.module.scss"
import { priceFormatter } from "../utils/priceFormatter"

interface HomeProps {
  product: {
    id: string
    amount: number
  }
}

export default function Home({ product }: HomeProps) {
  const formattedPrice = priceFormatter.format(
    product?.amount ?? 0
  )

  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
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
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const productResponse = await stripe.prices.retrieve(
    process.env.STRIPE_PRODUCT_ID,
    {
      expand: ["product"],
    }
  )

  const product = {
    id: productResponse?.id,
    amount: productResponse?.unit_amount / 100,
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
