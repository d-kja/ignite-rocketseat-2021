import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next"
import { parseCookies } from "nookies"
import { AuthTokenError } from "../app/services/errors/AuthTokenError"
import { destroyAuthCookies } from "../app/services/api"
import tokenDecode from "jwt-decode"
import { checkPermissionsAndRoles } from "../app/hooks/useCan"

type OptionsParams = {
  validation?: {
    permissions?: string[]
    roles?: string[]
  }
}

type User = {
  permissions?: string[]
  roles?: string[]
}

export function withSSRAuth<T = unknown>(
  fn: GetServerSideProps<T>,
  options?: OptionsParams
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<T>> => {
    const cookies = parseCookies(ctx)
    const token = cookies["next-auth.token"]

    if (!token)
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      }

    if (options) {
      const user = tokenDecode<User>(token)
      const { permissions, roles } = options.validation

      const canUserSeePage = checkPermissionsAndRoles({
        permissions,
        roles,
        user,
      })

      if (!canUserSeePage)
        return {
          notFound: true,
        }
    }

    try {
      // fallback fn
      return await fn(ctx)
    } catch (error) {
      console.log(error instanceof AuthTokenError)
      // if (error instanceof AuthTokenError) {
      destroyAuthCookies(ctx, undefined)

      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      }
      // }
    }

    return {
      props: {},
    } as GetServerSidePropsResult<T>
  }
}
