import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Livelihood from './Livelihood';

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
          <Box m={1}>
            <Typography variant="h5">Dashboard</Typography>
          </Box>
          <Livelihood />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
