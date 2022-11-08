import React, { useState } from 'react';
import { Box, Button, Grid, Paper, TableCell, TableRow } from '@mui/material';
import AddMemberForm from '../Forms/AddMemberForm';
import {
  SampleFisherfolkQueryDocument,
  SampleFisherfolkQueryQuery,
} from '../../graphql/generated';
import RecordsTable from '../Table/Table';
import { useQuery } from '@apollo/client';
import Loading from '../Loading/Loading';

const headers = () => {
  return (
    <>
      <TableRow>
        <TableCell>
          <b>ID</b>
        </TableCell>
        <TableCell>
          <b>LAST NAME</b>
        </TableCell>
        <TableCell>
          <b>FIRST NAME</b>
        </TableCell>
        <TableCell>
          <b>MIDDLE NAME</b>
        </TableCell>
        <TableCell>
          <b>AGE</b>
        </TableCell>
        <TableCell>
          <b>CONTACT NO.</b>
        </TableCell>
        <TableCell>
          <b>BARANGAY</b>
        </TableCell>
        <TableCell>
          <b>CITY\MUNICIPALITY</b>
        </TableCell>
        <TableCell>
          <b>PROVINCE</b>
        </TableCell>
      </TableRow>
    </>
  );
};

const cells = (data: SampleFisherfolkQueryQuery | undefined) => {
  if (typeof data != 'undefined') {
    const { fisherfolks } = data;

    return (
      <>
        {fisherfolks.map((fisherfolk) => {
          const {
            id,
            lastName,
            firstName,
            middleName,
            age,
            barangay,
            cityMunicipality,
            province,
            contactNum,
          } = fisherfolk;

          return (
            <TableRow key={id}>
              <TableCell component="th" scope="row" align="right">
                {id}
              </TableCell>
              <TableCell align="right">{lastName}</TableCell>
              <TableCell align="right">{firstName}</TableCell>
              <TableCell align="right">{middleName}</TableCell>
              <TableCell align="right">{age}</TableCell>
              <TableCell align="right">{contactNum}</TableCell>
              <TableCell align="right">{barangay}</TableCell>
              <TableCell align="right">{cityMunicipality}</TableCell>
              <TableCell align="right">{province}</TableCell>
            </TableRow>
          );
        })}
      </>
    );
  }

  return <h1> NO DATA!!!</h1>;
};

const FisherfolkRecord = () => {
  const [addMemberBtn, setAddMemberBtn] = useState(false);
  const handleAddMemberOpen = () => setAddMemberBtn(true);
  const handleAddMemberClose = () => setAddMemberBtn(false);
  const { loading, error, data } = useQuery(SampleFisherfolkQueryDocument);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.log(error);
    return <h1>Error Failed to Fetch!!!</h1>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 2,
          }}
        >
          <Box m={1} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              sx={{ height: 30 }}
              onClick={handleAddMemberOpen}
            >
              Add Member
            </Button>
            {addMemberBtn && (
              <AddMemberForm
                handleClose={handleAddMemberClose}
                open={addMemberBtn}
              />
            )}
          </Box>
        </Paper>
      </Grid>
      <Grid item>
        <Paper
          sx={{
            p: 0,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 2,
          }}
        >
          <Box m={1} display="flex" justifyContent="flex-end">
            <RecordsTable headers={headers()} rows={cells(data)} />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FisherfolkRecord;
