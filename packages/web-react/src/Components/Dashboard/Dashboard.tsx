import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import Livelihood from './Livelihood';
import FisherfolkInfo from './Fisherfolk';
import FisherfolkInfoCount from './CountFisherfolk';

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
            minHeight: 700
          }}
        >
          <Box m={1}>
            <Typography variant="h5">Dashboard</Typography>
          </Box>
          <FisherfolkInfoCount/>
          <Livelihood />
          <FisherfolkInfo/>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
