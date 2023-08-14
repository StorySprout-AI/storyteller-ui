import React, { useEffect } from 'react'

interface MetaTagProps {
  name: string
  content: string
}

export default function MetaTag({ name, content }: MetaTagProps) {
  useEffect(() => {
    const resource = document.createElement('meta')
    resource.name = name
    resource.content = content
    document.head.appendChild(resource)

    return () => {
      if (document.head.contains(resource)) document.head.removeChild(resource)
    }
  })

  return <></>
}
