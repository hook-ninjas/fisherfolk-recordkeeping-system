import React from 'react';
import { useQuery } from '@apollo/client';
import {
  LivelihoodCountDocument,
  SourceOfIncome,
} from '../../graphql/generated';
import {
  CircularProgress,
  Grid,
  Stack,
  Typography,
  styled,
  Paper,
  Box,
} from '@mui/material';
import { splitUpperCase } from '../../utils/utils';
import CaptureFishing from '../../Assets/capture_fishing.png';
import FishVending from '../../Assets/fish_vending.png';
import FishProcessing from '../../Assets/fish_processing.png';
import Aquaculture from '../../Assets/aquaculture.png';

export const LivelihoodPaper = styled(Paper)(({ theme }) => ({
  padding: 5,
  borderRadius: 10,
  margin: 2,
  height: 80,
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    width: 170,
  },
  [theme.breakpoints.down('sm')]: {
    width: 120,
  },
}));

const images = {
  Aquaculture: Aquaculture,
  CaptureFishing: CaptureFishing,
  FishProcessing: FishProcessing,
  FishVending: FishVending,
  Others: '',
};

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
          <LivelihoodPaper key={item} elevation={2}>
            <Stack direction="row" spacing={1.5}>
              <Grid item sm={3} mt={1}>
                <Box
                  component="img"
                  src={images[item]}
                  sx={{ width: 37, borderRadius: 15 }}
                ></Box>
              </Grid>
              <Grid item sm={9}>
                <Typography variant="subtitle2" color="#71797E" mt={0.5}>
                  {splitUpperCase(item)}
                </Typography>
                <Typography variant="h5" color="#71797E">
                  <b>{getCount(item)}</b>
                </Typography>
              </Grid>
            </Stack>
          </LivelihoodPaper>
        ))}
      </Grid>
    </Stack>
  );
}
