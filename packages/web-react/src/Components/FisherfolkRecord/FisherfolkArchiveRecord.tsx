import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import FisherfolkArchiveTable from '../Table/FisherfolkArchiveTable';

const FisherfolkArchiveRecord = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: .5,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 2,
          }}
        >
          <Box m={1}>
            <Typography variant="h6">Fisherfolk Archive Record</Typography>
          </Box>
          <Grid item>
            <Box m={1}>
              <FisherfolkArchiveTable />
            </Box>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FisherfolkArchiveRecord;
