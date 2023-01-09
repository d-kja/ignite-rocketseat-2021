export class AuthTokenError extends Error {
  constructor() {
    super("Auth refresh token invalid")
  }
}