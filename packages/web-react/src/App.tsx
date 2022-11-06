import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from './Components/SideBar/SideBar';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', boxShadow: 3 }}>
        <CssBaseline />
        <Sidebar />
        <Box
          component="main"
          sx={{
            backgroundColor: '#F6F8FB',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}></Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
