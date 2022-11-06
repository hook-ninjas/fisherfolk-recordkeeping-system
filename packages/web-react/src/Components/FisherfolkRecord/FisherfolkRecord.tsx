import React, { useState } from 'react';
import { Box, Button, Grid, Paper } from '@mui/material';

import AddMemberForm from '../Forms/AddMemberForm';

function FisherfolkRecord() {
  const [addMemberBtn, setAddMemberBtn] = useState(false);

  const handleAddMemberOpen = () => setAddMemberBtn(true);
  const handleAddMemberClose = () => setAddMemberBtn(false);

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
    </Grid>
  );
}

export default FisherfolkRecord;
