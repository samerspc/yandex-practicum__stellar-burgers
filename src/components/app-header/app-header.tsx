import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AppHeaderUI } from '@ui';
import { selectUser } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser);
  const location = useLocation();

  const userName = user?.name;

  return (
    <AppHeaderUI
      userName={userName}
      isConstructorActive={location.pathname === '/'}
      isFeedActive={location.pathname === '/feed'}
      isProfileActive={location.pathname.startsWith('/profile')}
    />
  );
};
