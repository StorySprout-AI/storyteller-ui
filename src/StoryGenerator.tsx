import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';

const StoryGenerator: React.FC = () => {
  const [hero, setHero] = useState('');
  const [place, setPlace] = useState('');
  const [character, setCharacter] = useState('');
  const [object, setObject] = useState('');
  const [storyPages, setStoryPages] = useState<string[]>([]);
  const [age, setAge] = useState('');
  const [subject, setSubject] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStoryPage, setCurrentStoryPage] = useState(0);

  const heroes = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Harry', 'Ivy', 'Jack'];
  const places = ['Wonderland', 'Neverland', 'Hogwarts', 'Narnia', 'Middle Earth', 'Camelot', 'Atlantis', 'Oz', 'Underworld', 'Heaven'];
  const characters = ['Rabbit', 'Fairy', 'Wizard', 'Lion', 'Elf', 'Knight', 'Mermaid', 'Witch', 'Ghost', 'Angel'];
  const objects = ['Mirror', 'Lamp', 'Ring', 'Sword', 'Map', 'Key', 'Book', 'Crystal Ball', 'Potion', 'Treasure Chest'];
  const subjects = ['Friendship', 'Adventure', 'Courage', 'Kindness', 'Exploration', 'Magic', 'Nature', 'Dreams', 'Discovery', 'Love'];
  const ages = ['3-4', '5-6', '7-8', '9-10', '11-12', '13-14', '15-16', '17-18'];

  useEffect(() => {
    if (storyPages.length > 0) {
      setCurrentStoryPage(0);
    }
  }, [storyPages]);

  const generateStory = async () => {
    setLoading(true);

    const newPrompt = `Write a 10 page story about ${subject} with a hero named ${hero}, set in a place called ${place}, featuring a secondary character named ${character}, and a significant object referred to as ${object}. The story must be age-appropriate for kids between ${age} years old. Split your response into 10 pages, with each page containing 500 characters start each with "Page 1", "Page 2", etc. And mark the end of the story with "The End".`;
    const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

    setPrompt(newPrompt);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: newPrompt }],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${openaiApiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const generatedStory = response.data.choices[0].message.content;
      const pages = generatedStory.split(/Page \d+:/).filter((page: string) => page.trim() !== '');

      setStoryPages(pages);
    } catch (error) {
      console.error('Error generating story:', error);
    } finally {
      setLoading(false);
    }
  };

  const goToNextPage = () => {
    setCurrentStoryPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentStoryPage((prevPage) => prevPage - 1);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f8f8f8',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
          width: '100%',
          maxWidth: '800px',
          backgroundColor: '#fff',
          padding: '20px',
        }}
      >
        <Box
          sx={{
            gridColumn: '1 / span 3',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" sx={{ textAlign: 'center', marginBottom: '20px' }}>
            Welcome to StorySprout
          </Typography>
        </Box>
        <Box
          sx={{
            gridColumn: '1 / span 3',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <Typography variant="body1" sx={{ textAlign: 'center', color: '#808080' }}>
            Create amazing stories with just a few clicks! Simply select the options below and click "Generate Story" to get started.
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
        <Select
          labelId="place-label"
          value={place}
          onChange={(e) => setPlace(e.target.value as string)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
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
        <Select
          labelId="age-label"
          value={age}
          onChange={(e) => setAge(e.target.value as string)}
          label="Age"
        >
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
      <Box
        sx={{
          gridColumn: '2',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
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
          bgcolor: 'background.paper',
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
            maxWidth: 600,
          }}
        >
          <Typography sx={{ whiteSpace: 'pre-line' }}>{storyPages[currentStoryPage]}</Typography>
        </Box>
    
        <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
          <Button
            variant="contained"
            onClick={goToPreviousPage}
            disabled={currentStoryPage === 0}
          >
            Previous Page
          </Button>
          <Button
            variant="contained"
            onClick={goToNextPage}
            disabled={currentStoryPage === storyPages.length - 1}
          >
            Next Page
          </Button>
        </Box>
      </Box>
    )}
  </Box>
</Box>
);
};

export default StoryGenerator;
