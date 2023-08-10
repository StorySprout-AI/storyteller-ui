import React from 'react'
import AppleOauth from 'components/shared/AppleOauth'

export default function AppleLogin() {
  const handleLoginCallback = (resp: any) => {
    console.debug({ resp })
  }

  return (
    <AppleOauth 
      onSuccess={handleLoginCallback} 
      onError={handleLoginCallback} />
  )
}