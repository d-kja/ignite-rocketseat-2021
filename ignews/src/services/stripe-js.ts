import { loadStripe } from "@stripe/stripe-js"

export async function loadStripeJs() {
  const stripeJs = await loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_API_PUBLIC_KEY,
    {
      apiVersion: "2022-08-01",
    }
  )

  return stripeJs
}
