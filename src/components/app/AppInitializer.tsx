import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { fetchUser, init } from '../../services/slices/userSlice';
import { getCookie } from '../../utils/cookie';

export const AppInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      dispatch(fetchUser()).catch(() => {
        dispatch(init());
      });
    } else {
      dispatch(init());
    }
  }, [dispatch]);

  return null;
};
