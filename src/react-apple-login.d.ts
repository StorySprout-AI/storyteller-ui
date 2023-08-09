import React, { ComponentProps } from 'react'

declare module 'react-apple-login' {
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

  export interface AppleID {
    auth: {
      init(config: ClientConfigI): Promise<any>
      signIn(signInConfig?: ClientConfigI): Promise<SignInResponseI|SignInErrorI>
    }
  }

  // Login props https://github.com/patelmayankce/react-apple-login#login-props
  type ReactAppleLoginProps = {
    clientId: string
    redirectURI: string
    scope?: string
    state?: string
    nonce?: string
    usePopup?: boolean
    responseType?: string // code, id_token, or both
    responseMode?: 'query' | 'fragment' | 'form_post'
    designProp?: {
      border_radius?: number
      width?: number
      height?: number
      color?: 'black' | 'white'
      border?: boolean
      type?: 'sign-in' | 'sign-up' | 'continue'
      scale?: number
      locale?: string
    }
    callback?: (response: SignInResponseI|SignInErrorI) => void
  }

  // Adding custom props: https://www.credera.com/insights/typescript-adding-custom-type-definitions-for-existing-libraries
  export default interface ReactAppleLogin extends React.Component<ReactAppleLoginProps & ComponentProps> {}
}
