import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
} from '@mui/material';
import Sidebar from '../SideBar/SideBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddMemberForm from '../Forms/AddMemberForm';

const theme = createTheme();

function FisherfolkRecord() {
  const [openDrawer, setOpenDrawer] = useState(true);
  const [addMemberBtn, setAddMemberBtn] = useState(false);

  const handleAddMemberOpen = () => setAddMemberBtn(true);
  const handleAddMemberClose = () => setAddMemberBtn(false);

  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', boxShadow: 3 }}>
        <CssBaseline />
        <Sidebar />
        <Box
          component="main"
          sx={{
            backgroundColor: '#F6F8FB',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
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
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default FisherfolkRecord;
