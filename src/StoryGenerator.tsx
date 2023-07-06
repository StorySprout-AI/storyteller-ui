import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography } from '@mui/material';

const StoryGenerator: React.FC = () => {
  const [hero, setHero] = useState('');
  const [place, setPlace] = useState('');
  const [character, setCharacter] = useState('');
  const [object, setObject] = useState('');
  const [story, setStory] = useState('');
  const [prompt, setPrompt] = useState('');

  const generateStory = async () => {
    const newPrompt = `Write a 32 page story with a hero named ${hero}, set in a place called ${place}, featuring a secondary character named ${character}, and a significant object referred to as ${object}. The story must be age-appropriate for kids between 3 to 4 years old.`;
    const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

    setPrompt(newPrompt);
    
    try {
      const response = await axios.post('https://api.openai.com/v1/completions', {
        model: 'text-davinci-003',
        prompt: newPrompt,
        temperature: 1,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      }, {
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json'
        }
      });
      setStory(response.data.choices[0].text);
    } catch (error) {
      console.error('Error generating story:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        m: 2,
      }}
    >
      <TextField label="Hero's Name" variant="outlined" onChange={e => setHero(e.target.value)} />
      <TextField label="Place" variant="outlined" onChange={e => setPlace(e.target.value)} />
      <TextField label="Secondary Character" variant="outlined" onChange={e => setCharacter(e.target.value)} />
      <TextField label="Object" variant="outlined" onChange={e => setObject(e.target.value)} />
      <Button variant="contained" onClick={generateStory}>Generate Story</Button>
      {story && 
        <Box
          sx={{
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
          <Typography variant="h4">Your Generated Story:</Typography>
          <Typography>{story}</Typography>
        </Box>
      }
    </Box>
  );
};

export default StoryGenerator;
