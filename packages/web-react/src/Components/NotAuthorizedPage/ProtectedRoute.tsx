import React from 'react';
import { useQuery } from '@apollo/client';
import { AuthUserDocument } from '../../graphql/generated';
import Loading from '../Loading/Loading';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(AuthUserDocument);

  if (loading) return <Loading />;

  if (error)
    return (
      <Stack direction="row" spacing={2}>
        <Typography variant="body2">{error.message}</Typography>
        <button onClick={() => navigate('/login')}>Go back</button>
      </Stack>
    );

  return data && !data.user ? (
    <Navigate to="/login" replace={true} />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
