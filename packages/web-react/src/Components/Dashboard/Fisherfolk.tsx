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
  FisherfolkGenderCountDocument,
  Gender,
  TotalGearsDocument,
} from '../../graphql/generated';
import Gear from '../../Assets/gear.png';
import Barangay from '../../Assets/barangay.png';
import Vessel from '../../Assets/vessel.png';

export const FisherfolkInfoPaper = styled(Paper)(({ theme }) => ({
  height: 140,
  padding: 15,
  borderRadius: 10,
  margin: 2,
  [theme.breakpoints.up('sm')]: {
    width: 280,
  },
  [theme.breakpoints.down('sm')]: {
    width: 250,
    height: 120,
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

  const getCountGender = (gender:Gender) =>{
    const  {data} =useQuery(FisherfolkGenderCountDocument,{
      variables:{
        gender:gender
      },
    })
    return data?.fisherfolkGender
  }

  return (
    <Stack direction="row" mb={5}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between', margin: 1 }}
      >
        {Object.keys(fisherfolkInfo).map((item) => (
          <FisherfolkInfoPaper key={item} elevation={2}>
            <Stack direction="row" spacing={1.8}>
              <Grid item sm={3} >
                <Box
                  component="img"
                  src={fisherfolkInfo[item][0]}
                  sx={{ width: 50, borderRadius: 15 }}
                  mt={2}
                ></Box>
              </Grid>
              <Grid item sm={9}>
                <Typography variant="h6" color="#71797E" mt={2}>
                  {item}
                </Typography>
                <Typography
                  variant="h4"
                  color="#71797E"
                  mt={1}
                  aria-label={`${item.toLocaleLowerCase()}-${getCount(item)}`}
                >
                  <b>{getCount(item)}</b>
                </Typography>
              </Grid>
              
            </Stack>
          </FisherfolkInfoPaper>
        ))}
      </Grid>
    </Stack>
  );
}
