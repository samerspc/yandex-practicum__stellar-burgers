import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import {
  selectUser,
  selectUserInit,
  selectUserLoading
} from 'src/services/slices/userSlice';

import { Preloader } from '@ui';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector(selectUser);
  const isInit = useSelector(selectUserInit);
  const isLoading = useSelector(selectUserLoading);
  const location = useLocation();

  if (!isInit || isLoading) {
    return <Preloader />;
  }

  if (!user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return <>{children}</>;
};
