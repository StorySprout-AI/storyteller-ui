export interface User {
  id: number
  name: string
  email?: string
  image?: string
  provider?: string
}

export interface TokenizedUser {
  iss: string
  iat: number
  exp: number
  aud: string
  jti: string
  sub: string
  user: User
}
