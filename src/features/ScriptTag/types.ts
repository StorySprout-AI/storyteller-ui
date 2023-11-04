export interface ScriptTagProps {
  id: string
  src: string
  async?: boolean
  callback?: () => void
  children?: React.ReactNode
}

export type ScriptTagHookProps = Omit<ScriptTagProps, 'children'>
