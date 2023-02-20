import React from 'react';
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
import {
  FisherfolkCountDocument,
  FisherfolkGenderCountDocument,
  Gender,
} from '../../graphql/generated';
import Gear from '../../Assets/gear.png';
import Barangay from '../../Assets/barangay.png';
import Vessel from '../../Assets/vessel.png';
import Female from '../../Assets/female.png';
import Male from '../../Assets/male.png';

export const FisherfolkInfoPaper = styled(Paper)(({ theme }) => ({
  height: 110,
  padding: 15,
  borderRadius: 10,
  margin: 2,
  marginTop: 20,
  [theme.breakpoints.up('sm')]: {
    width: 220,
  },
  [theme.breakpoints.down('sm')]: {
    width: 250,
    height: 120,
  },
}));

export const GenderPaper = styled(Paper)(({ theme }) => ({
  height: 150,
  padding: 15,
  borderRadius: 10,
  margin: 2,
  [theme.breakpoints.up('sm')]: {
    width: 170,
  },
  [theme.breakpoints.down('sm')]: {
    width: 250,
    height: 120,
  },
}));

export const CustomTitleFont = styled(Typography)(({ theme }) => ({
  color: '#71797E',
  [theme.breakpoints.down('sm')]: {
    fontSize: 20,
  },
}));

export const CustomCountFont = styled(Typography)(({ theme }) => ({
  color: '#71797E',
  [theme.breakpoints.down('sm')]: {
    fontSize: 36,
  },
}));

const getCountGender = (gender: Gender) => {
  const { data } = useQuery(FisherfolkGenderCountDocument, {
    variables: {
      gender: gender,
    },
  });
  return data?.fisherfolkGender;
};

export default function FisherfolkInfo() {
  const fisherfolkQuery = useQuery(FisherfolkCountDocument);

  const gender: Record<string, any[]> = {
    Male: [Male, getCountGender(Gender.Male)],
    Female: [Female, getCountGender(Gender.Female)],
  };

  const fisherfolkInfo: Record<string, any[]> = {
    'Total Barangays': [Barangay, fisherfolkQuery.data?.barangayCount],
    'Total Vessels': [Vessel, fisherfolkQuery.data?.totalVessels],
    'Total Gears': [Gear, fisherfolkQuery.data?.totalGears],
  };

  const getCount = (value: string, info: Record<string, any[]>) => {
    if (fisherfolkQuery.loading) {
      return <CircularProgress size={20} />;
    }

    return info[value][1];
  };

  return (
    <Stack direction="row" mb={5}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between', margin: 1 }}
      >
        {Object.keys(gender).map((item) => (
          <GenderPaper key={item} elevation={2}>
            <Stack direction="row" spacing={3.5} alignItems="center">
              <Grid item sm={3}>
                <Box
                  component="img"
                  src={gender[item][0]}
                  sx={{ width: 50, borderRadius: 15 }}
                  mt={2}
                ></Box>
              </Grid>
              <Grid item sm={9}>
                <Typography color="#71797E" mt={1} variant="h5">
                  {item}
                </Typography>
                <Typography
                  variant="h4"
                  color="#71797E"
                  mt={1}
                  aria-label={`${item.toLocaleLowerCase()}-${getCount(
                    item,
                    gender
                  )}`}
                >
                  <b>{getCount(item, gender)}</b>
                </Typography>
              </Grid>
            </Stack>
          </GenderPaper>
        ))}
        {Object.keys(fisherfolkInfo).map((item) => (
          <FisherfolkInfoPaper key={item} elevation={2}>
            <Stack direction="row" spacing={1.8} alignItems="center">
              <Grid item sm={3}>
                <Box
                  component="img"
                  src={fisherfolkInfo[item][0]}
                  sx={{ width: 50, borderRadius: 15 }}
                  mt={2}
                ></Box>
              </Grid>
              <Grid item sm={9}>
                <Typography color="#71797E" mt={1} fontSize={17}>
                  {item}
                </Typography>
                <Typography
                  variant="h4"
                  color="#71797E"
                  mt={1}
                  aria-label={`${item.toLocaleLowerCase()}-${getCount(
                    item,
                    fisherfolkInfo
                  )}`}
                >
                  <b>{getCount(item, fisherfolkInfo)}</b>
                </Typography>
              </Grid>
            </Stack>
          </FisherfolkInfoPaper>
        ))}
      </Grid>
    </Stack>
  );
}
