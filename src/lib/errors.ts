export class InvalidAccessTokenError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidTokenError'
  }
}

export class AccessTokenNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AccessTokenNotFoundError'
  }
}
