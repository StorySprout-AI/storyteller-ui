import { useState, useCallback } from 'react'
import { ScriptTagHookProps } from '../types'

export default function useScriptTag({ id, src, async, callback }: ScriptTagHookProps) {
  const [resource, setResource] = useState<HTMLScriptElement | null>(null)

  const render = useCallback(() => {
    const tag = document.getElementById(id)
    if (tag) {
      if (!!callback) callback()
      return
    }

    const script = document.createElement('script')
    script.src = src
    if (!!id) script.id = id
    if (!!async) script.async = true
    document.body.appendChild(script)
    setResource(script)
    if (!!callback) callback()
  }, [async, callback, id, src])

  const remove = useCallback(() => {
    if (!!resource && document.body.contains(resource)) document.body.removeChild(resource)
  }, [resource])

  return { render, remove }
}
