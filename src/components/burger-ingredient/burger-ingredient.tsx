import { FC, memo } from 'react';
import { useDispatch } from '../../services/store';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { addItem, setBun } from '../../services/slices/constructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useDispatch();

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        dispatch(setBun(ingredient));
      } else {
        dispatch(addItem(ingredient));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        handleAdd={handleAdd}
      />
    );
  }
);
