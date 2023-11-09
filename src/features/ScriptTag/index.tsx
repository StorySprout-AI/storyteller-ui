import React, { useEffect } from 'react'
import useScriptTag from './hooks/useScriptTag'
import { ScriptTagProps } from './types'

export { default as useScriptTag } from './hooks/useScriptTag'
export * from './types'

export default function ScriptTag({ id, src, async = false, callback, children }: ScriptTagProps) {
  const { render, remove } = useScriptTag({ id, src, async, callback })

  useEffect(() => {
    render()
    return remove
  })

  return <>{children}</>
}
