import axios, { AxiosError, AxiosInstance } from "axios"
import { GetServerSidePropsContext } from "next"
import { destroyCookie, parseCookies, setCookie } from "nookies"

import { AuthTokenError } from "./errors/AuthTokenError"

type updateAuthCookiesProps = {
  authToken: string
  authRefreshToken: string
}
type TAuthResponse = {
  code: string
  error: boolean
  message: string
}

let isRefreshingToken = false
let failedRequestsQueue = []

export const updateAuthCookies = (
  { authToken, authRefreshToken }: updateAuthCookiesProps,
  ctx: GetServerSidePropsContext = undefined,
  api: AxiosInstance
) => {
  setCookie(ctx, "next-auth.token", authToken, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/", // global path
  })
  setCookie(ctx, "next-auth.refreshToken", authRefreshToken, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/", // global path
  })

  updateAuthHeader(authToken, api)
}
const updateAuthHeader = (authToken: string, api: AxiosInstance) =>
  (api.defaults.headers["Authorization"] = `Bearer ${authToken}`)
export const destroyAuthCookies = async (
  ctx: GetServerSidePropsContext = undefined,
  api: AxiosInstance = undefined
) => {
  destroyCookie(ctx, "next-auth.token")
  destroyCookie(ctx, "next-auth.refreshToken")

  if (!!api) api.defaults.headers["Authorization"] = undefined

  // if(typeof window !== "undefined") Router.push("/") (client-side only)
  // if(process.browser) Router.push("/") *deprecated*
}

export const apiClient = (ctx: GetServerSidePropsContext = undefined) => {
  let cookies = parseCookies(ctx)

  const apiInstance = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
      Authorization: `Bearer ${cookies["next-auth.token"]}`,
    },
  })

  // intercepting response to refresh token
  apiInstance.interceptors.response.use(
    (res) => {
      return res
    }, // ignore successful responses
    (err: AxiosError<TAuthResponse>) => {
      if (err.response.status === 401) {
        if (err.response.data?.code === "token.expired") {
          cookies = parseCookies(ctx)

          const { "next-auth.refreshToken": refreshToken } = cookies

          // Config holding anything related to the request, so that we can retry it later using the same parameters as the base
          const originalRequestConfig = err.config

          // If it's not refreshing, refresh the token & retry failed requests
          if (!isRefreshingToken) {
            isRefreshingToken = true

            apiInstance
              .post("/refresh", {
                refreshToken,
              })
              .then((response) => {
                const { token, refreshToken: newRefreshToken } = response.data
                updateAuthCookies(
                  {
                    authToken: token,
                    authRefreshToken: newRefreshToken,
                  },
                  ctx,
                  apiInstance
                )

                failedRequestsQueue.forEach((request) =>
                  request.onResolve(token)
                )
                failedRequestsQueue = []
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request) => request.onReject(err))
                failedRequestsQueue = []

                destroyAuthCookies(ctx, apiInstance)
                if (typeof window !== "undefined") {
                  // signOut() (Client side)
                }
              })
              .finally(() => {
                isRefreshingToken = false
              })
          }

          // Queue failed requests to retry later
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onResolve: (token: string) => {
                if (!originalRequestConfig) return Promise.reject()

                originalRequestConfig.headers[
                  "Authorization"
                ] = `Bearer ${token}`

                return resolve(apiInstance(originalRequestConfig))
              },
              onReject: (err: AxiosError) => reject(err),
            })
          })
        } else {
          if (typeof window === "undefined") {
            return Promise.reject(new AuthTokenError())
          } else {
            destroyAuthCookies(ctx, apiInstance)
            // signOut() (Client side / non APP Folder)
          }
        }
      }

      // if the error status isn't 401, Next()
      return Promise.reject(err)
    }
  )

  return apiInstance
}

export const api = apiClient()
