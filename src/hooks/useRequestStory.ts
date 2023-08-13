import { useState, useCallback, useContext } from 'react'
import axios from 'axios'
import { StoryBuilderContext } from 'features/PagedStory/v1/components/StoryBuilder'

export default function useRequestStory() {
  const [loading, setLoading] = useState(false)
  const [storyPages, setStoryPages] = useState<string[]>([])
  const builder = useContext(StoryBuilderContext)

  const requestStory = useCallback(
    async (prompt: string) => {
      setLoading(true)
      const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7
          },
          {
            headers: {
              Authorization: `Bearer ${openaiApiKey}`,
              'Content-Type': 'application/json'
            }
          }
        )
        const generatedStory = response.data.choices[0].message.content
        const pages = generatedStory.split(/Page \d+:/).filter((page: string) => page.trim() !== '')

        if (builder.open) {
          console.debug('Attempting to close story builder...')
          builder.toggleDrawer('bottom', false)
        }

        setStoryPages(pages)
      } catch (error) {
        console.error('Error generating story:', error)
      } finally {
        setLoading(false)
      }
    },
    [builder]
  )

  return {
    loading,
    prompt,
    storyPages,
    requestStory
  }
}
