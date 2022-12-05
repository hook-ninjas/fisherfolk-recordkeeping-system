import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import FisherfolkVesselTable from '../Table/FisherfolkVesselTable';

const FisherfolkBoatRecord = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 2,
          }}
        >
          <Box m={1}>
            <Typography variant="h5">Fisherfolk Boat Record</Typography>
          </Box>
          <Grid item>
            <Box m={1}>
              <FisherfolkVesselTable />
            </Box>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FisherfolkBoatRecord;
