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
import { FisherfolkCountDocument } from '../../graphql/generated';
import Total from '../../Assets/total.jpg';
import Active from '../../Assets/active.png';

export const FisherfolkInfoPaper = styled(Paper)(({ theme }) => ({
  height: 150,
  padding: 15,
  borderRadius: 10,
  margin: 2,
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    width: 500,
  },
  [theme.breakpoints.down('sm')]: {
    width: 250,
  },
}));

export const CustomTitleFont = styled(Typography)(({ theme }) => ({
  color: '#71797E',
  [theme.breakpoints.up('sm')]: {
    display: 'inline'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 20,
  },
}));

export const CustomCountFont = styled(Typography)(({ theme }) => ({
  color: '#71797E',
  [theme.breakpoints.up('sm')]: {
    display: 'inline'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 36,
  },
}));

export default function Fisherfolk() {
  const fisherfolk = useQuery(FisherfolkCountDocument);

  const fisherfolkInfo: Record<string, any[]> = {
    'Total Fisherfolk': [Total, fisherfolk.data?.totalFisherfolk],
    'Active Fisherfolk': [Active, fisherfolk.data?.activeFisherFolk],
  };

  const getCount = (value: string) => {
    if (fisherfolk.loading) {
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
            <Stack direction="row" spacing={4} alignItems="center">
              <Grid item sm={3}>
                <Box
                  component="img"
                  src={fisherfolkInfo[item][0]}
                  sx={{ width: 70, borderRadius: 15 }}
                  mt={1}
                ></Box>
              </Grid>
              <Grid item sm={9}>
                <CustomTitleFont variant="h5" color="#71797E" mr={7}>
                  {item}
                </CustomTitleFont>
                <CustomCountFont
                  variant="h3"
                  fontWeight={600}
                  aria-label={`${item.toLocaleLowerCase()}-${getCount(item)}`}
                >
                  {getCount(item)}
                </CustomCountFont>
              </Grid>
            </Stack>
          </FisherfolkInfoPaper>
        ))}
      </Grid>
    </Stack>
  );
}
