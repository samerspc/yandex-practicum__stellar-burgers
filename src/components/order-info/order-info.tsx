import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import {
  selectCurrentOrder,
  selectOrderLoading,
  fetchOrderByNumber
} from '../../services/slices/orderSlice';
import { selectIngredients } from '../../services/slices/ingredientsSlice';

export const OrderInfo: FC = () => {
  const { number, id } = useParams<{ number?: string; id?: string }>();
  const dispatch = useDispatch();
  const orderData = useSelector(selectCurrentOrder);
  const isLoading = useSelector(selectOrderLoading);
  const ingredients = useSelector(selectIngredients);

  const orderNumber = number || id;

  useEffect(() => {
    if (orderNumber) {
      dispatch(fetchOrderByNumber(parseInt(orderNumber)));
    }
  }, [orderNumber, dispatch]);

  useEffect(() => {
    if (!ingredients.length) {
      import('../../services/slices/ingredientsSlice').then(
        ({ fetchIngredients }) => {
          dispatch(fetchIngredients());
        }
      );
    }
  }, [ingredients.length, dispatch]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length || !orderData.ingredients)
      return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isLoading || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
