import type { NextApiRequest, NextApiResponse } from "next"
import type { Readable } from "stream"
import Stripe from "stripe"
import { stripe } from "../../../services/stripe"
import { saveSubscriptions } from "./_lib/manageSubscription"

const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
])

async function buffer(readable: Readable) {
  const chunks = []

  for await (const chunk of readable) {
    chunks.push(
      typeof chunk === "string" ? Buffer.from(chunk) : chunk
    )
  }

  return Buffer.concat(chunks)
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let event: Stripe.Event
    const buff = await buffer(req)
    const stripeSignature = req.headers["stripe-signature"]

    try {
      event = stripe.webhooks.constructEvent(
        buff,
        stripeSignature,
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } catch (error) {
      console.error(error)
      return res
        .status(400)
        .json({ "webhook-error": error.message })
    }

    const { type } = event

    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case "customer.subscription.created":
          case "customer.subscription.updated":
          case "customer.subscription.deleted":
            const subscription = event.data
              .object as Stripe.Subscription

            await saveSubscriptions({
              customerId: subscription.customer.toString(),
              subscriptionId: subscription.id,
              createAction:
                type === "customer.subscription.created",
            })

            break
          case "checkout.session.completed":
            const checkoutSession = event.data
              .object as Stripe.Checkout.Session

            await saveSubscriptions({
              customerId:
                checkoutSession.customer.toString(),
              subscriptionId:
                checkoutSession.subscription.toString(),
              createAction: true,
            })

            break

          default:
            throw new Error(
              `Unhandled webhook event (${type})`
            )
        }
      } catch (error) {
        console.log(error)
        return res.status(400).json({
          "event-type": type,
          "webhook-error": error.message,
        })
      }
    }

    res.status(200).json({
      "event-type": type,
      "event-status": "received",
    })
  } else {
    res
      .status(405)
      .setHeader("Allow", "POST")
      .end("Method not allowed")
  }
}
