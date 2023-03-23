import React from 'react';
import { Alert, Box, Grid, Paper, Typography } from '@mui/material';
import FisherfolkProgramCard from '../Card/FisherfolkProgramCard';
import { useQuery } from '@apollo/client';
import { GovernmentAidsDocument } from '../../graphql/generated';
import Loading from '../Loading/Loading';
import { CustomAddButton, CustomBtnText } from '../Buttons/CustomAddButton';
import AddIcon from '@mui/icons-material/Add';
import BasicTabs, { Item } from '../Tab/BasicTab';

const FisherfolkProgram = () => {
  const { loading, error, data } = useQuery(GovernmentAidsDocument);

  if (error) {
    return <Alert severity="error">Something went wrong.</Alert>;
  }

  if (loading) {
    return <Loading />;
  }

  const OnGoingPrograms = () => (
    <Grid item>
      <Grid container spacing={5} p={0.8}>
        {data &&
          data.govermentAids
            .filter((a) => new Date(a.endDate) > new Date())
            .map((aid) => {
              return (
                <Grid key={aid.id} item xs={12} sm={6} md={4}>
                  <FisherfolkProgramCard
                    title={aid.title}
                    slot={aid.slot}
                    startDate={aid.startDate}
                    endDate={aid.endDate}
                  />
                </Grid>
              );
            })}
      </Grid>
    </Grid>
  );

  const CompletedPrograms = () => (
    <Grid item>
      <Grid container spacing={5} p={0.8}>
        {data &&
          data.govermentAids
            .filter((a) => new Date(a.endDate) < new Date())
            .map((aid) => {
              return (
                <Grid key={aid.id} item xs={12} sm={6} md={4}>
                  <FisherfolkProgramCard
                    title={aid.title}
                    slot={aid.slot}
                    startDate={aid.startDate}
                    endDate={aid.endDate}
                  />
                </Grid>
              );
            })}
      </Grid>
    </Grid>
  );

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
          <Box m={1} display="flex" justifyContent="space-between">
            <Typography variant="h6">Fisherfolk Programs</Typography>
            <Box display="flex" justifyContent="end">
              <CustomAddButton variant="contained" endIcon={<AddIcon />}>
                <CustomBtnText>Add Program</CustomBtnText>
              </CustomAddButton>
            </Box>
          </Box>
          <Grid item>
            <Item sx={{ p: 0 }}>
              <Grid container>
                <BasicTabs
                  tab1Label="Ongoing"
                  tab2Label="Completed"
                  tabelPanel1={<OnGoingPrograms />}
                  tabelPanel2={<CompletedPrograms />}
                />
              </Grid>
            </Item>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FisherfolkProgram;
