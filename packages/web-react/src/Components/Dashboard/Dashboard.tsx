import React from 'react';
import { Box, Container, CssBaseline, Grid, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from '../SideBar/SideBar';

const theme = createTheme();

function Dashboard() {
  return (
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
  );
}

export default Dashboard;
