import React from 'react'

interface StoryBuilderStatusProps {
  loading: boolean
  storiesAvailable: boolean
}

// TODO: We can test the performance of these prompts
export const CTAMessageOptions = [
  "What's your story about today?",
  'Prompt a new story',
  'Choose your story adventure',
  "Let's make a new tale",
  'What adventure awaits your Hero today?'
]

const pickARandomCTAPrompt = () => {
  const pickIndex = Math.ceil(Math.random() * CTAMessageOptions.length)
  return CTAMessageOptions[pickIndex]
}

export default function Status({ loading, storiesAvailable }: StoryBuilderStatusProps) {
  if (loading) {
    return <span>One moment, while we build your story...</span>
  }

  return (
    <>
      {!!storiesAvailable && <span>Your story is ready</span>}
      {!storiesAvailable && <span>{pickARandomCTAPrompt()}</span>}
    </>
  )
}
