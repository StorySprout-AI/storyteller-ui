import React, { ReactNode } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import styled from '@mui/material/styles/styled'
import withRoot from 'features/PagedStory/v1/modules/withRoot'

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

const StatusTitleTextBox = ({ children }: { children: ReactNode }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <Typography variant="h5">{children}</Typography>
    </Box>
  )
}

export default function Status({ loading, storiesAvailable }: StoryBuilderStatusProps) {
  if (loading) {
    return <StatusTitleTextBox>One moment, while we build your story...</StatusTitleTextBox>
  }

  return (
    <StatusTitleTextBox>
      {!!storiesAvailable && <span>Your story is ready</span>}
      {!storiesAvailable && <span>{pickARandomCTAPrompt()}</span>}
    </StatusTitleTextBox>
  )
}
