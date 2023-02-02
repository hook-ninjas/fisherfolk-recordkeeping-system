import React, { useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import AddFisherfolkForm from '../Forms/AddMemberForm';
import FisherfolkTable from '../Table/FisherfolkTable';
import AddIcon from '@mui/icons-material/Add';
import { CustomAddButton, CustomBtnText } from '../Buttons/CustomAddButton';

const FisherfolkRecord = () => {
  const [addFisherfolkBtn, setFisherfolkBtn] = useState(false);
  const handleAddFisherfolkOpen = () => setFisherfolkBtn(true);
  const handleAddFisherfolkClose = () => setFisherfolkBtn(false);

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
            <Typography variant="h6">Fisherfolk Record</Typography>
            <CustomAddButton
              variant='contained'
              endIcon={<AddIcon />}
              onClick={handleAddFisherfolkOpen}
            >
              <CustomBtnText>Add Fisherfolk</CustomBtnText>
            </CustomAddButton>
            {addFisherfolkBtn && (
              <AddFisherfolkForm
                handleClose={handleAddFisherfolkClose}
                open={addFisherfolkBtn}
              />
            )}
          </Box>
          <Grid item>
            <Box m={1} display="flex" justifyContent="flex-end">
              <FisherfolkTable />
            </Box>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FisherfolkRecord;
