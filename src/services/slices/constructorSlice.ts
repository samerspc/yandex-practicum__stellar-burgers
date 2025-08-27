import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TIngredient } from '../../utils/types';
import type { RootState } from '../store';

export type ConstructorState = {
  bun: TIngredient | null;
  items: TIngredient[];
};

const initialState: ConstructorState = {
  bun: null,
  items: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },
    addItem(state, action: PayloadAction<TIngredient>) {
      state.items.push(action.payload);
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items.splice(action.payload, 1);
    },
    reorderItems(state, action: PayloadAction<{ from: number; to: number }>) {
      const { from, to } = action.payload;
      const [moved] = state.items.splice(from, 1);
      state.items.splice(to, 0, moved);
    },
    reset(state) {
      state.bun = null;
      state.items = [];
    }
  }
});

export const { setBun, addItem, removeItem, reorderItems, reset } =
  constructorSlice.actions;
export default constructorSlice.reducer;

export const selectConstructor = (state: RootState) => state.constructor;
export const selectConstructorBun = (state: RootState) => state.constructor.bun;
export const selectConstructorItems = (state: RootState) =>
  state.constructor.items;
