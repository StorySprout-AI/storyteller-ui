import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Box, Typography, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material'
import useUser from '../hooks/useUser'
import NavBar from './shared/NavBar'
import { heroes, places, characters, subjects, objects, ages, writingStyles } from '../data/prompts'
import { useStoryPrompt } from 'hooks'

const StoryGenerator: React.FC = () => {
  const { 
    hero, setHero, 
    place, setPlace, 
    character, setCharacter, 
    object, setObject, 
    age, setAge, 
    subject, setSubject, 
    composePrompt 
  } = useStoryPrompt()
  const [storyPages, setStoryPages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [currentStoryPage, setCurrentStoryPage] = useState(0)
  const { user } = useUser()

  useEffect(() => {
    if (storyPages.length > 0) {
      setCurrentStoryPage(0)
    }
  }, [storyPages])

  const generateStory = async () => {
    setLoading(true)

    const prompt = composePrompt()
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
  }

  const goToNextPage = () => {
    setCurrentStoryPage((prevPage) => prevPage + 1)
  }

  const goToPreviousPage = () => {
    setCurrentStoryPage((prevPage) => prevPage - 1)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    window.location.reload()
  }

  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px'
      }}
    >
      <NavBar handleLogout={handleLogout} />
      <br />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
          width: '100%',
          maxWidth: '800px',
          backgroundColor: '#fff',
          padding: '20px'
        }}
      >
        <Box
          sx={{
            gridColumn: '1 / span 3',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: '20px' }}>
            Hello {user?.name}!
          </Typography>
        </Box>
        <Box
          sx={{
            gridColumn: '1 / span 3',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px'
          }}
        >
          <Typography variant="body1" sx={{ textAlign: 'center', color: '#808080' }}>
            Create amazing stories with just a few clicks! Simply select the options below and click "Generate Story" to
            get started.
          </Typography>
        </Box>
        <FormControl variant="outlined">
          <InputLabel id="hero-label">Hero's Name</InputLabel>
          <Select
            labelId="hero-label"
            value={hero}
            onChange={(e) => setHero(e.target.value as string)}
            label="Hero's Name"
          >
            {heroes.map((name, index) => (
              <MenuItem key={index} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel id="place-label">Place</InputLabel>
          <Select labelId="place-label" value={place} onChange={(e) => setPlace(e.target.value as string)}>
            {places.map((name, index) => (
              <MenuItem key={index} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel id="character-label">Secondary Character</InputLabel>
          <Select
            labelId="character-label"
            value={character}
            onChange={(e) => setCharacter(e.target.value as string)}
            label="Secondary Character"
          >
            {characters.map((name, index) => (
              <MenuItem key={index} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel id="object-label">Object</InputLabel>
          <Select
            labelId="object-label"
            value={object}
            onChange={(e) => setObject(e.target.value as string)}
            label="Object"
          >
            {objects.map((name, index) => (
              <MenuItem key={index} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel id="age-label">Age</InputLabel>
          <Select labelId="age-label" value={age} onChange={(e) => setAge(e.target.value as string)} label="Age">
            {ages.map((name, index) => (
              <MenuItem key={index} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel id="subject-label">Subject</InputLabel>
          <Select
            labelId="subject-label"
            value={subject}
            onChange={(e) => setSubject(e.target.value as string)}
            label="Subject"
          >
            {subjects.map((name, index) => (
              <MenuItem key={index} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel id="writing-style-label">Writing Style</InputLabel>
          <Select labelId="writing-style-label" label="Writing Style">
            {writingStyles.map((name, index) => (
              <MenuItem key={index} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box
          sx={{
            gridColumn: '2',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Button variant="contained" onClick={generateStory} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Generate Story'}
          </Button>
        </Box>
        {storyPages.length > 0 && (
          <Box
            sx={{
              gridColumn: '1 / span 3',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              m: 2,
              p: 2,
              border: '1px solid black',
              borderRadius: '5px',
              bgcolor: 'background.paper'
            }}
          >
            <Typography variant="h4" sx={{ textAlign: 'center' }}>
              Your Generated Story:
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                width: '100%',
                maxWidth: 600
              }}
            >
              <Typography sx={{ whiteSpace: 'pre-line' }}>{storyPages[currentStoryPage]}</Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
              <Button variant="contained" onClick={goToPreviousPage} disabled={currentStoryPage === 0}>
                Previous Page
              </Button>
              <Button variant="contained" onClick={goToNextPage} disabled={currentStoryPage === storyPages.length - 1}>
                Next Page
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default StoryGenerator
