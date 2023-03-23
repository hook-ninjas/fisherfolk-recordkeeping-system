import React from 'react';
import { Alert, Box, Grid, Typography } from '@mui/material';
import FisherfolkProgramCard from '../Card/FisherfolkProgramCard';
import { useQuery } from '@apollo/client';
import { GovernmentAidsDocument } from '../../graphql/generated';
import Loading from '../Loading/Loading';

const FisherfolkProgram = () => {
  const { loading, error, data } = useQuery(GovernmentAidsDocument);

  if (error) {
    return <Alert severity="error">Something went wrong.</Alert>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box m={1} display="flex" justifyContent="space-between">
          <Typography variant="h5">Fisherfolk Programs</Typography>
        </Box>
        <Grid item mt={3}>
          <Grid container spacing={3}>
            {data &&
              data.govermentAids.map((aid) => {
                return (
                  <Grid key={aid.id} item xs={12} sm={6} md={4}>
                    <FisherfolkProgramCard
                      title={aid.title}
                      slot={aid.slot}
                      date={aid.date}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FisherfolkProgram;
