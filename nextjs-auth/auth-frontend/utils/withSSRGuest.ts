import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next"
import { parseCookies } from "nookies"

type withSSRGuestConfig = {
  path?: string
}

export function withSSRGuest<T = unknown>(
  fn: GetServerSideProps<T>,
  config?: withSSRGuestConfig
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<T>> => {
    const cookies = parseCookies(ctx)

    if (cookies["next-auth.token"]) {
      return {
        redirect: {
          destination: config?.path ?? "/profile",
          permanent: false,
        },
      }
    }

    return await fn(ctx)
  }
}
