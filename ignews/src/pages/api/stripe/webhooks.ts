import { NextApiRequest, NextApiResponse } from "next"
import { Readable } from "stream"
import Stripe from "stripe"
import { stripe } from "../../../services/stripe"

const relevantEvents = new Set([
  "checkout.session.completed",
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
      console.log(event);
    }

    res
      .status(200)
      .json({ "event-type": type,"event-status": "received" })
  } else {
    res
      .status(405)
      .setHeader("Allow", "POST")
      .end("Method not allowed")
  }
}
