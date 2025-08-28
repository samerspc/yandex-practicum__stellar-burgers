import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/store';
import {
  selectProfileOrders,
  selectProfileOrdersLoading,
  selectProfileOrdersError,
  fetchProfileOrders
} from '../../services/slices/profileOrdersSlice';
import {
  selectIngredients,
  fetchIngredients
} from '../../services/slices/ingredientsSlice';
import { Preloader } from '../../components/ui/preloader';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectProfileOrders);
  const isLoading = useSelector(selectProfileOrdersLoading);
  const error = useSelector(selectProfileOrdersError);
  const ingredients = useSelector(selectIngredients);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(fetchProfileOrders());
      hasFetched.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка загрузки заказов: {error}</div>;
  }

  console.log('Orders:', orders);
  console.log('Ingredients:', ingredients.length);

  return <ProfileOrdersUI orders={orders} />;
};
