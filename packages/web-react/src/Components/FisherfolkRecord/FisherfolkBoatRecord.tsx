import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import FisherfolkVesselTable from '../Table/FisherfolkVesselTable';
import { useQuery } from '@apollo/client';
import { VesselQueryDocument } from '../../graphql/generated';

const FisherfolkBoatRecord = () => {
  const { loading, error, data } = useQuery(VesselQueryDocument);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 0.5,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 2,
          }}
        >
          <Box m={1}>
            <Typography variant="h6">Fisherfolk Boat Record</Typography>
          </Box>
          <Grid item>
            <Box m={1}>
              <FisherfolkVesselTable
                loading={loading}
                error={error}
                data={data}
              />
            </Box>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FisherfolkBoatRecord;
