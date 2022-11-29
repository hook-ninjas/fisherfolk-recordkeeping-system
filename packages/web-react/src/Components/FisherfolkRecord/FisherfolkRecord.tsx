import React, { useState } from 'react';
import { Box, Button, Grid, Paper } from '@mui/material';
import AddFisherfolkForm from '../Forms/AddMemberForm';
import FisherfolkTable from '../Table/FisherfolkTable';

const FisherfolkRecord = () => {
  const [addFisherfolkBtn, setFisherfolkBtn] = useState(false);
  const handleAddFisherfolkOpen = () => setFisherfolkBtn(true);
  const handleAddFisherfolkClose = () => setFisherfolkBtn(false);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: .5,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 2,
          }}
        >
          <Box m={1} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{
                height: 30,
                background: '#28c181',
                fontSize: 12,
                fontWeight: '600',
                color: 'whitesmoke'
              }}
              onClick={handleAddFisherfolkOpen}
            >
              Add Fisherfolk
            </Button>
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
