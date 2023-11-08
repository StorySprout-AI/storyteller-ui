import React from 'react'
import Box from '@mui/material/Box'

import random from 'lodash/random'

import TitleTextBox from 'components/shared/TitleTextBox'

export interface StoryBuilderStatusProps {
  loading: boolean
  storiesAvailable: boolean
}

// TODO: We can test the performance of these prompts
export const CTAMessageOptions = [
  "What's your story about today?",
  'Prompt a new story',
  'Choose your story adventure',
  "Let's make a new tale",
  "Let's build a new story"
]

const pickARandomCTAPrompt = () => {
  const pickIndex = random(0, CTAMessageOptions.length - 1, false)
  return CTAMessageOptions[pickIndex]
}

export default function Status({ loading, storiesAvailable }: StoryBuilderStatusProps) {
  const [ctaText] = React.useState(() => pickARandomCTAPrompt())

  if (loading) {
    return (
      <TitleTextBox>
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>One moment, while we build your story...</Box>
        <Box sx={{ display: { sm: 'none' } }}>Working...</Box>
      </TitleTextBox>
    )
  }

  return (
    <TitleTextBox>
      {!!storiesAvailable && <span>Your story is ready</span>}
      {!storiesAvailable && <span>{ctaText}</span>}
    </TitleTextBox>
  )
}
