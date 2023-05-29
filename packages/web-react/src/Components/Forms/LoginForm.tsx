import React, { useState } from 'react';
import {
  Alert,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Stack,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import {
  LoginUserDocument,
  MutationLoginUserArgs,
} from '../../graphql/generated';
import OfficeLogo from '../../Assets/city-agri-logo.png';
import CityLogo from '../../Assets/seal_of_iloilo_city.png';
import { LoginSchema } from './validation/schema';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

const theme = createTheme();

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleSubmitting = () => setIsSubmitting(true);
  const navigate = useNavigate();

  const [loginUser] = useMutation(LoginUserDocument, {
    onCompleted: () => {
      navigate('/dashboard', { replace: true });
    },
    onError: (err) => {
      setError(err.message);
      setIsSubmitting(false);
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = handleSubmit(async (input) => {
    handleSubmitting();
    const createUserInput: MutationLoginUserArgs = {
      data: {
        username: input.username,
        password: input.password,
      },
    };

    const resut = await loginUser({
      variables: {
        data: createUserInput.data,
      },
    });

    //set token to local storage
    localStorage.setItem('token', resut.data ? resut.data.loginUser.token : '');
  });

  const handleSubmitLoginForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Stack direction="row" spacing={3}>
            <Box
              component="img"
              sx={{
                height: 90,
                width: 90,
              }}
              src={CityLogo}
            />
            <Box
              component="img"
              sx={{
                height: 95,
                width: 95,
              }}
              src={OfficeLogo}
            />
          </Stack>
          <Typography component="h1" variant="h5" mt={5}>
            Welcome
          </Typography>
          <Typography component="h1" variant="body2" mt={1}>
            Please login to continue
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <Controller
              name="username"
              control={control}
              render={({ field: { value } }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  id="username"
                  label="Username"
                  value={value}
                  {...register('username')}
                  helperText={errors['username']?.message?.toString()}
                  error={!!errors['username']}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field: { value } }) => (
                <TextField
                  margin="normal"
                  fullWidth
                  label="Password"
                  id="password"
                  value={value}
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  helperText={errors['password']?.message?.toString()}
                  error={!!errors['password']}
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
              )}
            />
            {error && <Alert severity="error">{error}</Alert>}
            {isSubmitting ? (
              <LoadingButton
                loading
                fullWidth
                loadingPosition="start"
                sx={{
                  mt: 3,
                  mb: 2,
                }}
                startIcon={<SaveIcon />}
                variant="contained"
              >
                Loading
              </LoadingButton>
            ) : (
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
                onClick={(e) => {
                  handleSubmitLoginForm(e);
                }}
              >
                Continue
              </Button>
            )}
            <Grid container></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
