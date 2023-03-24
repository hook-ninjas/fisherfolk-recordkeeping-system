import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Livelihood from './Livelihood';
import FisherfolkInfo from './Fisherfolk';
import Fisherfolk from './CountFisherfolk';

function Dashboard() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box m={1}>
          <Typography variant="h4">Dashboard</Typography>
        </Box>
        <Fisherfolk />
        <FisherfolkInfo />
        <Livelihood />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
