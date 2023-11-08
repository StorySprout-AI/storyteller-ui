import Box from '@mui/material/Box'
import styled from '@mui/system/styled'

export default styled(Box)`
  h4 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 1rem;
    @media (max-width: 600px) {
      font-size: 1.2rem;
    }
    @media (min-width: 600px, max-width: 960px) {
      font-size: 1.2rem;
    }
    @media (min-width: 960px) {
      font-size: 1.5rem;
    }
  }
`
