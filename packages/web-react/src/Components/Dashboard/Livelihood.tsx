import React from 'react';
import { useQuery } from '@apollo/client';
import { LivelihoodCountDocument, SourceOfIncome } from '../../graphql/generated';
import {
  CircularProgress,
  Grid,
  Stack,
  Typography,
  Paper,
} from '@mui/material';
import { splitUpperCase } from '../../utils/utils';

function getCount(activity: SourceOfIncome) {
  const { data, loading } = useQuery(LivelihoodCountDocument, {
    variables: {
      activity: activity,
    },
  });

  if (loading) return <CircularProgress size={20} />;

  return data && data.livelihoodCount;
}

export default function Livelihood() {
  return (
    <Stack direction="row">
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between', margin: 1 }}
      >
        {Object.values(SourceOfIncome).map((item) => (
          <Paper
            key={item}
            elevation={2}
            sx={{
              height: 100,
              width: 100,
              padding: 2,
              borderRadius: 4,
              margin: 1,
            }}
          >
            <Grid item sm={2}>
              <Typography variant="body2" color='#71797E'>{splitUpperCase(item)}</Typography>
              <Typography variant="h5" color='#71797E'><b>{getCount(item)}</b></Typography>
            </Grid>
          </  Paper>
        ))}
      </Grid>
    </Stack>
  );
}
