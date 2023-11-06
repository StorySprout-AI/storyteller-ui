import React from 'react'
import axios from 'lib/axios'

interface StoryParams {
  hero: string
  place: string
  character: string
  object: string
  age: string
  subject: string
}

interface Story {
  id: number // @TODO: Refactor BE to use UUIDs
  title?: string
  description: string
}
/**
 * @TODO Refactor to useStoryPromptVariables and make a call to
 *   POST /api/v1/stories
 *
 * @returns
 */
export default function useRequestStoryV2() {
  const [loading, setLoading] = React.useState(false)
  const [storyPages, setStoryPages] = React.useState<string[]>([])

  const requestStory = React.useCallback(async (story: StoryParams, successCallback?: () => Promise<void>) => {
    console.debug({ story })
    setLoading(true)
    try {
      const response = await axios.post<Story>(
        '/api/v1/stories',
        { story },
        { headers: { 'Content-Type': 'application/json' } }
      )

      console.debug({ response })
      const generatedStory = response.data.description
      const pages = generatedStory.split(/Page \d+:/).filter((page: string) => page.trim() !== '')

      if (!!successCallback) await successCallback()

      setStoryPages(pages)
    } catch (error) {
      console.error('Error generating story:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    prompt,
    storyPages,
    requestStory
  }
}
