import * as React from 'react'
import { Box, Container, ThemeProvider } from '@mui/material'
import DialogDemo from './pages/DialogDemo'
import { theme } from './theme/theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box sx={{ py: 2, textAlign: 'center' }}>
          <DialogDemo />
        </Box>
      </Container>
    </ThemeProvider>
  )
}
