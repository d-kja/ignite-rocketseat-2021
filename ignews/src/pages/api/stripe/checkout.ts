import type { NextApiRequest, NextApiResponse } from "next"

import { getSession } from "next-auth/react"
import { stripe } from "../../../services/stripe"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      user: { email },
    } = await getSession({ req })

    const stripeCustomer = await stripe.customers.create({
      email,
      // metadata
    })

    const stripeCheckoutSession =
      await stripe.checkout.sessions.create({
        customer: stripeCustomer.id,
        line_items: [
          {
            price: process.env.STRIPE_PRODUCT_ID,
            quantity: 1,
          },
        ],
        mode: "subscription",
        allow_promotion_codes: true,
        payment_method_types: ["card", "pix"],
        billing_address_collection: "required",
        success_url: process.env.STRIPE_SUCCESS_URL,
        cancel_url: process.env.STRIPE_CANCEL_URL,
      })

    res.status(200).json({
      sessionId: stripeCheckoutSession.id,
    })
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method not allowed")
  }
}
