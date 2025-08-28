import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  selectConstructorBun,
  selectConstructorItems
} from '../../services/slices/constructorSlice';
import {
  selectOrderLoading,
  selectOrderData,
  createOrder
} from '../../services/slices/orderSlice';
import { selectUser } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bun = useSelector(selectConstructorBun);
  const items = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderLoading);
  const orderModalData = useSelector(selectOrderData);
  const user = useSelector(selectUser);

  const constructorItems = {
    bun,
    ingredients: items
  };

  const onOrderClick = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest || !constructorItems.ingredients)
      return;

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    await dispatch(createOrder(ingredientIds));
  };

  const closeOrderModal = () => {
    window.history.back();
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      (constructorItems.ingredients
        ? constructorItems.ingredients.reduce((s: number, v) => s + v.price, 0)
        : 0),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
