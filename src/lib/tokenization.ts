import CryptoJS from 'crypto-js'

export function decrypt(encryptedPayload: string): string {
  return CryptoJS.AES.decrypt(encryptedPayload as string, process.env.REACT_APP_ENCRYPTION_KEY as string).toString(
    CryptoJS.enc.Utf8
  )
}

export function encrypt(stringifiedPayload: string): string {
  return CryptoJS.AES.encrypt(stringifiedPayload, process.env.REACT_APP_ENCRYPTION_KEY as string).toString()
}

const tokenizerAPI = {
  decrypt,
  encrypt
}

export default tokenizerAPI
