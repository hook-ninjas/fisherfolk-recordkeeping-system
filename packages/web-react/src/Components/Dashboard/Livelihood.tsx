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
  padding: 8,
  borderRadius: 10,
  margin: 2,
  height: 130,
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    width: 210,
  },
  [theme.breakpoints.down('sm')]: {
    width: 250,
    height: 100,
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
    <Stack direction="row" mb={4}>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between', margin: 1 }}
      >
        {Object.values(SourceOfIncome).map((item) => (
          <LivelihoodPaper key={item} elevation={2}>
            <Stack direction="row" spacing={2} alignItems='center'>
              <Grid item sm={3} mt={1}>
                <Box
                  component="img"
                  src={images[item]}
                  sx={{ width: 45 }}
                ></Box>
              </Grid>
              <Grid item sm={9}>
                <Typography color="#71797E" mt={1} fontSize={16.8}>
                  {splitUpperCase(item)}
                </Typography>
                <Typography
                  variant="h4"
                  component='h4'
                  color="#71797E"
                  aria-label={`${item.toLocaleLowerCase()}-${getCount(item)}`}
                >
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
