import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

// DB
import { query as q } from "faunadb"
import { fauna } from "../../../services/fauna"

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,

      // Scope
      authorization: {
        params: {
          scope: "read:user",
        },
      },
    }),
  ],

  // Callbacks
  callbacks: {
    async session({ session }) {
      const {
        user: { email },
      } = session

      try {
        const subscription = await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index("subscription_by_customer_ref"),
                q.Select(
                  "ref",
                  q.Get(
                    q.Match(
                      q.Index("user_by_email"),
                      q.Casefold(email)
                    )
                  )
                )
              ),
              q.Match(
                q.Index("subscription_by_status"),
                "active"
              ),
            ])
          )
        )

        return {
          ...session,
          subscription,
        }
      } catch (error) {
        console.log(error)
      }

      return { ...session, subscription: null }
    },
    async signIn({ user }) {
      const { name, email } = user

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index("user_by_email"),
                  q.Casefold(email)
                )
              )
            ),
            q.Create(q.Collection("users"), {
              data: {
                email,
                name,
              },
            }),
            q.Get(
              q.Match(
                q.Index("user_by_email"),
                q.Casefold(email)
              )
            )
          )
        )

        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
  },
}

export default NextAuth(authOptions)
