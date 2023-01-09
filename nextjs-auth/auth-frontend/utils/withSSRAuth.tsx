import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next"
import { parseCookies } from "nookies"

export function withSSRAuth<T = unknown>(fn: GetServerSideProps<T>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<T>> => {
    const cookies = parseCookies(ctx)

    if (!cookies["next-auth.token"])
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      }

    // fallback fn
    return await fn(ctx)
  }
}
