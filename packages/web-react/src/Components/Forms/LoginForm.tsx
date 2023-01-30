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
  Link,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { object, string } from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import {
  LoginUserDocument,
  MutationLoginUserArgs,
} from '../../graphql/generated';

const theme = createTheme();

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleSubmitting = () => setIsSubmitting(true);
  const navigate = useNavigate();
  const handleCreateAccount = () => {
    navigate('/create-account');
  };

  const loginSchema = object().shape({
    username: string().required('Enter username.'),
    password: string().required('Enter password.'),
  });

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
    resolver: yupResolver(loginSchema),
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
            marginTop: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
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
            <Grid container></Grid>
          </Box>
          <Stack direction="row" spacing={0.5}>
            <Typography variant="subtitle2">
              {'Don\'t have an account?'}
            </Typography>
            <Link
              component="button"
              variant="subtitle2"
              color="#28c181"
              fontWeight={600}
              underline="none"
              onClick={handleCreateAccount}
              disabled={isSubmitting}
            >
              Create account
            </Link>
          </Stack>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
