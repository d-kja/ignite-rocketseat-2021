import axios, { AxiosError } from "axios"
import { destroyCookie, parseCookies, setCookie } from "nookies"

let cookies = parseCookies()
let isRefreshingToken = false
let failedRequestsQueue = []

export const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: `Bearer ${cookies["next-auth.token"]}`,
  },
})

type updateAuthCookiesProps = {
  authToken: string
  authRefreshToken: string
}
type TAuthResponse = {
  code: string
  error: boolean
  message: string
}

export const updateAuthCookies = ({
  authToken,
  authRefreshToken,
}: updateAuthCookiesProps) => {
  setCookie(undefined, "next-auth.token", authToken, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/", // global path
  })
  setCookie(undefined, "next-auth.refreshToken", authRefreshToken, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/", // global path
  })

  updateAuthHeader(authToken)
}
const updateAuthHeader = (authToken: string) =>
  (api.defaults.headers["Authorization"] = `Bearer ${authToken}`)
export const destroyAuthCookies = async () => {
  destroyCookie(undefined, "next-auth.token")
  destroyCookie(undefined, "next-auth.refreshToken")

  api.defaults.headers["Authorization"] = undefined
  // Router.push("/") (Client-side only)
}

// intercepting response to refresh token
api.interceptors.response.use(
  (res) => {
    return res
  }, // ignore successful responses
  (err: AxiosError<TAuthResponse>) => {
    if (err.response.status === 401) {
      if (err.response.data?.code === "token.expired") {
        cookies = parseCookies()
        const { "next-auth.refreshToken": refreshToken } = cookies
        const originalRequestConfig = err.config

        // If it's not refreshing, refresh the token & retry failed requests
        if (!isRefreshingToken) {
          isRefreshingToken = true
          api
            .post("/refresh", {
              refreshToken,
            })
            .then((response) => {
              const { token, refreshToken: newRefreshToken } = response.data

              updateAuthCookies({
                authToken: token,
                authRefreshToken: newRefreshToken,
              })

              failedRequestsQueue.forEach((request) => request.onResolve(token))
              failedRequestsQueue = []
            })
            .catch((err) => {
              failedRequestsQueue.forEach((request) => request.onReject(err))
              failedRequestsQueue = []
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

              originalRequestConfig.headers["Authorization"] = `Bearer ${token}`

              return resolve(api(originalRequestConfig))
            },
            onReject: (err: AxiosError) => reject(err),
          })
        })
      }
    } else {
      destroyAuthCookies()
    }

    // if the error status isn't 401, Next()
    return Promise.reject(err)
  }
)
