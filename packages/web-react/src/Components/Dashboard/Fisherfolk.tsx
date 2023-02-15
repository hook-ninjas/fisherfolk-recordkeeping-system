import { useQuery } from '@apollo/client';
import {
  Grid,
  Paper,
  Stack,
  Typography,
  styled,
  Box,
  CircularProgress,
} from '@mui/material';
import React from 'react';
import {
  BarangayCountDocument,
  TotalGearsDocument,
} from '../../graphql/generated';
import Gear from '../../Assets/gear.png';
import Barangay from '../../Assets/barangay.png';
import Vessel from '../../Assets/vessel.png';
import Fishpond from '../../Assets/aquaculture.png';

export const FisherfolkInfoPaper = styled(Paper)(({ theme }) => ({
  height: 70,
  padding: 8,
  borderRadius: 10,
  margin: 2,
  [theme.breakpoints.up('sm')]: {
    width: 180,
  },
  [theme.breakpoints.down('sm')]: {
    width: 250,
  },
}));

export default function FisherfolkInfo() {
  const gears = useQuery(TotalGearsDocument);
  const barangays = useQuery(BarangayCountDocument);

  const fisherfolkInfo: Record<string, any[]> = {
    'Total Barangays': [
      Barangay,
      barangays.data && barangays.data.barangayCount,
    ],
    'Total Vessels': [Vessel, ''],
    'Total Fishponds': [Fishpond, ''],
    'Total Gears': [Gear, gears.data && gears.data.totalGears],
  };

  const getCount = (value: string) => {
    if (gears.loading) {
      return <CircularProgress size={20} />;
    }

    if (barangays.loading) {
      return <CircularProgress size={20} />;
    }

    return fisherfolkInfo[value][1];
  };

  return (
    <Stack direction="row" mb={5}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between', margin: 1 }}
      >
        {Object.keys(fisherfolkInfo).map((item) => (
          <FisherfolkInfoPaper key={item} elevation={2}>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item sm={3}>
                <Box
                  component="img"
                  src={fisherfolkInfo[item][0]}
                  sx={{ width: 37, borderRadius: 15 }}
                  mt={1}
                ></Box>
              </Grid>
              <Grid item sm={6}>
                <Typography variant="subtitle1" color="#71797E">
                  {item}
                </Typography>
              </Grid>
              <Grid item sm={3}>
                <Typography
                  variant="h5"
                  color="#71797E"
                  mt={1}
                  fontWeight={600}
                >
                  {getCount(item)}
                </Typography>
              </Grid>
            </Stack>
          </FisherfolkInfoPaper>
        ))}
      </Grid>
    </Stack>
  );
}
