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
  Snackbar,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import { object, string } from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CreateUserDocument,
  MutationCreateUserArgs,
} from '../../graphql/generated';
import { useMutation } from '@apollo/client';

const theme = createTheme();

function CreateAccount() {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleSubmitting = () => setIsSubmitting(true);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const wait = (time: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };

  const handleLogin = async () => {
    await wait(2500);
    navigate('/login');
  };

  const createAccountSchema = object().shape({
    username: string()
      .required('Enter username.')
      .min(6, 'Username must be atleast 6 characters.'),
    password: string()
      .required('Enter password.')
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*?[0-9])(?=.*[#?!@$%^&*_-]).{8,}$/,
        'Password must contain atleast 8 characters, one uppercase, one lowercase, one number and one special character.'
      ),
  });

  const [createUser] = useMutation(CreateUserDocument, {
    onCompleted: () => {
      handleOpen();
      handleLogin();
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
    resolver: yupResolver(createAccountSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    handleSubmitting();
    const createUserInput: MutationCreateUserArgs = {
      data: {
        username: data.username,
        password: data.password,
      },
    };

    const result = await createUser({
      variables: {
        data: createUserInput.data,
      },
    });

    //set token to local storage
    localStorage.setItem(
      'token',
      result.data ? result.data.createUser.token : ''
    );
  });

  const handleSubmitCreateAccountForm = (
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
                handleSubmitCreateAccountForm(e);
              }}
              disabled={isSubmitting}
            >
              Create account
            </Button>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: '100%', background: '#98FB98' }}
              >
                Success! Your account has been created.
              </Alert>
            </Snackbar>
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
