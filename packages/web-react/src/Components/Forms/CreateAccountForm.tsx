import React, { useState } from 'react';
import { Button, TextField, Box, IconButton, InputAdornment, Snackbar, DialogContent } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateUserDocument, MutationCreateUserArgs } from '../../graphql/generated';
import { useMutation } from '@apollo/client';
import { CreateAccountSchema } from './validation/schema';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { FormContainer, FormContainerTitle } from '../Containers/FormContainers';

interface CreateAccountFormProps {
  open: boolean;
  handleClose: () => void;
}

function CreateAccount({ open, handleClose }: CreateAccountFormProps) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleSubmitting = () => setIsSubmitting(true);

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const wait = (time: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };

  const handleLogin = async () => {
    await wait(1_500);
  };

  const [createUser] = useMutation(CreateUserDocument, {
    onCompleted: () => {
      handleOpenSnackbar();
      handleLogin();
      setIsSubmitting(false);
      handleClose();
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
    resolver: yupResolver(CreateAccountSchema),
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
    localStorage.setItem('token', result.data ? result.data.createUser.token : '');
  });

  const handleSubmitCreateAccountForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <FormContainer onClose={close} aria-labelledby="form-container" open={open}>
      <FormContainerTitle aria-labelledby="form-container-title" onClose={handleClose}>
        Add Account
      </FormContainerTitle>
      <DialogContent dividers>
        <Box component="form" sx={{ mt: 1 }}>
          <Controller name="username" control={control} render={({ field: { value } }) => <TextField autoComplete="new-email" margin="normal" fullWidth id="username" label="Username" value={value} {...register('username')} helperText={errors['username']?.message?.toString()} error={!!errors['username']} />} />
          <Controller
            name="password"
            control={control}
            render={({ field: { value } }) => (
              <TextField
                autoComplete="new-password"
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
                      <IconButton aria-label="pwd-visibility" onClick={handleClickShowPassword}>
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
              variant="outlined"
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
                handleSubmitCreateAccountForm(e);
              }}
            >
              Create account
            </Button>
          )}
          {!isSubmitting ? (
            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', background: '#98FB98' }}>
                Success! Your account has been created.
              </Alert>
            </Snackbar>
          ) : (
            ''
          )}
        </Box>
      </DialogContent>
    </FormContainer>
  );
}

export default CreateAccount;
