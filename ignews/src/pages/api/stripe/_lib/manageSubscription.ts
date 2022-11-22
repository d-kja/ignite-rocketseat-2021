// Types
import { saveSubscriptionsTypes } from "./types/manageSubscription.types"

// Imports
import { query as q } from "faunadb"
import { fauna } from "../../../../services/fauna"
import { stripe } from "../../../../services/stripe"

export async function saveSubscriptions({
  subscriptionId,
  customerId,
}: saveSubscriptionsTypes) {
  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(q.Index("user_by_stripe_id"), customerId)
      )
    )
  )

  const subscription = await stripe.subscriptions.retrieve(
    subscriptionId
  )

  const subscriptionData = {
    id: subscription.id,
    customer: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  }

  await fauna.query(
    q.Create(q.Collection("subscriptions"), {
      data: subscriptionData,
    })
  )
}
