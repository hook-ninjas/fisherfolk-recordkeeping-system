import React, { useState } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Stack,
  Link,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const theme = createTheme();

function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 18,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Create Account
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="Username"
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              id="password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="pwd-visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                background: '#28c181',
                fontSize: 12,
                fontWeight: '600',
                color: 'whitesmoke',
              }}
            >
              Create account
            </Button>
            <Grid container></Grid>
          </Box>
          <Stack direction="row" spacing={0.5}>
            <Typography variant="subtitle2">
              Already have an account?
            </Typography>
            <Link
              component="button"
              variant="subtitle2"
              color="#28c181"
              fontWeight={600}
              underline="none"
              onClick={handleLogin}
              textTransform="none"
            >
              Login
            </Link>
          </Stack>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default CreateAccount;
