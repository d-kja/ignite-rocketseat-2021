import type { NextApiRequest, NextApiResponse } from "next"
import type { Readable } from "stream"
import Stripe from "stripe"
import { stripe } from "../../../services/stripe"

const buffer = async (readable: Readable) => {
  const chunks = []

  for await (const chunk of readable) {
    chunks.push(
      typeof chunk === "string" ? Buffer.from(chunk) : chunk
    )
  }

  return Buffer.concat(chunks)
}

const relevantEvents = new Set(["checkout.session.completed"])

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let event: Stripe.Event
    const buff = await buffer(req)
    const signature = req.headers["stripe-signature"]

    try {
      event = stripe.webhooks.constructEvent(buff, signature, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (error) {
      res.status(400).send(`Webhook error: ${error.message}`)
    }

    const { type} = event
    if(relevantEvents.has(type)) {
      // do something
    }

    res.status(200).json({
      "event-type": type,
      "event-status": "received"
    })

  } else {
    res
      .status(405)
      .setHeader("Allow", "POST")
      .end("Method not allowed")
  }
}
