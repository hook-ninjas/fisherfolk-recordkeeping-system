import React from 'react';
import { Box, Container, CssBaseline, Grid, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from '../SideBar/SideBar';

const theme = createTheme();

function Dashboard() {
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
          <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 2,
                  }}
                >
                  Welcome to Dashboard Page!
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;
