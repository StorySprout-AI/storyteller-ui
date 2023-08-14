import * as storyPrompts from './prompts'

export function nullSafeStringOrValue<T = string>(newValue: T | null | undefined): T | string {
  if (!newValue) return ''

  return newValue as T
}

export const prompts = storyPrompts
