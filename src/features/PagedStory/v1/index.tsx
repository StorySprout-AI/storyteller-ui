import React, { useCallback, useContext } from 'react'

import Grid, { GridProps } from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'

import withRoot from './modules/withRoot'
import Button from './components/Button'
import Story from './modules/views/Story'

import { useAuth } from 'components/shared/AuthProvider'
import { useGenerateStory, useStoryPrompt } from 'hooks'
import { heroes, places, characters, subjects, objects, ages, writingStyles } from 'lib/prompts'
import { nullSafeStringOrValue } from 'lib'

import StoryBuilder from 'features/StoryBuilder'

function StackableItem({ children, ...otherProps }: GridProps) {
  return (
    <Grid item padding={1} xs={12} md={4} {...otherProps}>
      {children && (
        <FormControl variant="outlined" fullWidth>
          {children}
        </FormControl>
      )}
    </Grid>
  )
}

function CenteredRowItem({ children, ...otherProps }: GridProps) {
  return (
    <>
      <StackableItem sx={{ display: { xs: 'none', md: 'flex' } }} />
      <StackableItem>{children}</StackableItem>
      <StackableItem sx={{ display: { xs: 'none', md: 'flex' } }} />
    </>
  )
}

// Theme: https://mui.com/store/items/onepirate/
function PagedStoryV1() {
  const { user } = useAuth()
  const {
    hero,
    setHero,
    place,
    setPlace,
    character,
    setCharacter,
    object,
    setObject,
    age,
    setAge,
    subject,
    setSubject,
    writingStyle,
    setWritingStyle,
    composePrompt
  } = useStoryPrompt()
  const { loading, storyPages, requestStory } = useGenerateStory()
  const sbContext = useContext(StoryBuilder.Context)

  const generateStory = useCallback(async () => {
    const prompt = composePrompt()
    await requestStory(prompt)
    sbContext.toggleDrawer('bottom', false)
  }, [composePrompt, requestStory, sbContext])

  return (
    <>
      {/* Will show the story - when it's ready */}
      <Story loading={loading} pages={storyPages} />

      {/* Bottom drawer StoryBuilder form: https://mui.com/material-ui/react-drawer/#swipeable-edge */}
      <StoryBuilder.Drawer
        header={
          <>
            {!!loading && <span>Generating your story...</span>}
            {!loading && <span>&nbsp;</span>}
          </>
        }
      >
        <Box
          sx={{
            // backgroundColor: '#f5f5f5',
            // minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: { xs: '1.5rem', md: '40px' }
          }}
        >
          <Grid container maxWidth={800}>
            <Grid item xs={12} sx={{ display: { xs: 'flex', md: 'none' } }}>
              <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px' }}>
                Hello {user?.name}!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ textAlign: 'center', color: '#808080' }}>
                Create amazing stories with just a few clicks! Simply select the options below and click &quot;Generate
                Story&quot; to get started.
              </Typography>
            </Grid>
            <StackableItem>
              <InputLabel id="hero-label">Hero&#39;s Name</InputLabel>
              <Select
                labelId="hero-label"
                value={hero}
                onChange={(e) => setHero(nullSafeStringOrValue(e.target.value))}
                label="Hero's Name"
              >
                {heroes.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </StackableItem>
            <StackableItem>
              <InputLabel id="place-label">Place</InputLabel>
              <Select
                labelId="place-label"
                value={place}
                onChange={(e) => setPlace(nullSafeStringOrValue(e.target.value))}
              >
                {places.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </StackableItem>
            <StackableItem>
              <InputLabel id="character-label">Secondary Character</InputLabel>
              <Select
                labelId="character-label"
                value={character}
                onChange={(e) => setCharacter(nullSafeStringOrValue(e.target.value))}
                label="Secondary Character"
              >
                {characters.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </StackableItem>
            <StackableItem>
              <InputLabel id="object-label">Object</InputLabel>
              <Select
                labelId="object-label"
                value={object}
                onChange={(e) => setObject(nullSafeStringOrValue(e.target.value))}
                label="Object"
              >
                {objects.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </StackableItem>
            <StackableItem>
              <InputLabel id="age-label">Age</InputLabel>
              <Select
                labelId="age-label"
                value={age}
                onChange={(e) => setAge(nullSafeStringOrValue(e.target.value))}
                label="Age"
              >
                {ages.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </StackableItem>
            <StackableItem>
              <InputLabel id="subject-label">Subject</InputLabel>
              <Select
                labelId="subject-label"
                value={subject}
                onChange={(e) => setSubject(nullSafeStringOrValue(e.target.value))}
                label="Subject"
              >
                {subjects.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </StackableItem>
            <CenteredRowItem>
              <InputLabel id="writing-style-label">Writing Style</InputLabel>
              <Select
                labelId="writing-style-label"
                value={writingStyle}
                onChange={(e) => setWritingStyle(nullSafeStringOrValue(e.target.value))}
                label="Writing Style"
              >
                {writingStyles.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </CenteredRowItem>
            <CenteredRowItem>
              <Button fullWidth variant="contained" onClick={generateStory} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Generate Story'}
              </Button>
            </CenteredRowItem>
          </Grid>
        </Box>
      </StoryBuilder.Drawer>
    </>
  )
}

export default withRoot(PagedStoryV1)
