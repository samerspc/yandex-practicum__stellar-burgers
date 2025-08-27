import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import {
  selectUser,
  selectUserInit,
  selectUserLoading
} from '../../services/slices/userSlice';

import { Preloader } from '@ui';

export const AuthRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector(selectUser);
  const isInit = useSelector(selectUserInit);
  const isLoading = useSelector(selectUserLoading);
  const location = useLocation();

  if (!isInit || isLoading) {
    return <Preloader />;
  }

  if (user) {
    return <Navigate replace to='/' state={{ from: location }} />;
  }

  return <>{children}</>;
};
