import axios, { AxiosError } from "axios"
import { parseCookies, setCookie } from "nookies"

let cookies = parseCookies()

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

// intercepting response to refresh token
api.interceptors.response.use(
  (res) => {
    return res
  }, // ignore successful responses
  (err: AxiosError<TAuthResponse>) => {
    // just handle errors
    if (err.response?.status === 401) {
      if (err.response.data?.code === "token.expired") {
        cookies = parseCookies()
        const { "next-auth.refreshToken": authRefreshToken } = cookies

        api
          .post("/refresh", {
            refreshToken: authRefreshToken,
          })
          .then((res) => {
            updateAuthCookies({
              authToken: res.data?.token,
              authRefreshToken: res.data?.refreshToken,
            })
          })
          .catch((err) => console.error(err))
      } else {
      }
    }
  }
)
