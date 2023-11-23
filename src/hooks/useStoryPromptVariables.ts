import { useCallback, useState } from 'react'

/**
 * @TODO Refactor to useStoryPromptVariables which simply keeps track of
 *   all the prompt - but unlike useStoryPrompt, it doesn't compose the prompt
 *   and it doesn't have a composePrompt function - all of those features will
 *   be moved to the backend and accessed via POST /api/v1/stories in useRequestStoryV2
 *
 * @returns
 */
export default function useStoryPromptVariables() {
  const [hero, setHero] = useState('')
  const [place, setPlace] = useState('')
  const [character, setCharacter] = useState('')
  const [object, setObject] = useState('')
  const [age, setAge] = useState('')
  const [subject, setSubject] = useState('')
  const [writingStyle, setWritingStyle] = useState('')
  const composePrompt = useCallback<() => string>(() => {
    return `Write a 10 page story about ${subject} with a hero named ${hero}, \
    set in a place called ${place}, featuring a ${character} which you need to name, \
    and a significant object referred to as ${object}. The story must be age-appropriate \
    for kids between ${age} years old. Split your response into 10 pages, with each page \
    containing 500 characters start each with "Page 1", "Page 2", etc. And mark the end of \
    the story with "The End".`
  }, [age, character, hero, object, place, subject])

  return {
    subject,
    setSubject,
    place,
    setPlace,
    character,
    setCharacter,
    hero,
    setHero,
    object,
    setObject,
    age,
    setAge,
    writingStyle,
    setWritingStyle,
    composePrompt
  }
}
