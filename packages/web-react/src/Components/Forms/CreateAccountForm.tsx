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
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const navigate = useNavigate();
  const handleLogin = () => {
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
      handleLogin();
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
    const createUserInput: MutationCreateUserArgs = {
      data: {
        username: data.username,
        password: data.password,
      },
    };

    await createUser({
      variables: {
        data: createUserInput.data,
      },
    });
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
