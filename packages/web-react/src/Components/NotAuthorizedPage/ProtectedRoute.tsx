import React from 'react';
import { useQuery } from '@apollo/client';
import { AuthUserDocument } from '../../graphql/generated';
import Loading from '../Loading/Loading';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { loading, error, data } = useQuery(AuthUserDocument);

  if (loading) return <Loading />;

  if (error) return <p>{error.message}</p>;

  return data && !data.user ? (
    <Navigate to="/login" replace={true} />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
