import { useState, useCallback } from 'react'
import axios from 'axios'

export default function useGenerateStory(prompt: string) {
  const [loading, setLoading] = useState(false)
  const [storyPages, setStoryPages] = useState<string[]>([])

  const generateStory = useCallback(async () => {
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

      setStoryPages(pages)
    } catch (error) {
      console.error('Error generating story:', error)
    } finally {
      setLoading(false)
    }
  }, [prompt])

  return { 
    loading, 
    prompt, 
    storyPages, 
    generateStory 
  }
}
