export interface ClientConfigI {
  clientId: string
  redirectURI: string
  scope?: string
  state?: string
  nonce?: string
  usePopup?: boolean
}

export interface UserI {
  email: string
  name: {
    firstName: string
    lastName: string
  }
}

export interface SignInResponseI {
  authorization: {
    code: string
    id_token?: string
    state?: string
  }
}

export interface SignInErrorI {
  error: string
}
