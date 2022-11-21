import type { NextApiRequest, NextApiResponse } from "next"
import { query as q } from "faunadb"
import { fauna } from "../../../services/fauna"

import { getSession } from "next-auth/react"
import { stripe } from "../../../services/stripe"

type User = {
  ref: {
    id: string
  }
  data: {
    stripeCustomerId: string
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      user: { email },
    } = await getSession({ req })

    const user = await fauna.query<User>(
      q.Get(
        q.Match(q.Index("user_by_email"), q.Casefold(email))
      )
    )
    let stripeId = user.data.stripeCustomerId

    if (!stripeId) {
      const stripeCustomer = await stripe.customers.create({
        email,
        // metadata
      })

      await fauna.query(
        q.Update(
          q.Ref(q.Collection("users"), user.ref.id),
          {
            data: {
              stripeCustomerId: stripeCustomer.id,
            },
          }
        )
      )

      stripeId = stripeCustomer.id
    }

    const stripeCheckoutSession =
      await stripe.checkout.sessions.create({
        customer: stripeId,
        line_items: [
          {
            price: process.env.STRIPE_PRODUCT_ID,
            quantity: 1,
          },
        ],
        mode: "subscription",
        allow_promotion_codes: true,
        payment_method_types: ["card"],
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
