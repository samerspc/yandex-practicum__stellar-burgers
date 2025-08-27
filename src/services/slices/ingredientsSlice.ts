import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';
import { RootState } from '../store';

type IngredientsState = {
  list: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

const initialState: IngredientsState = {
  list: [],
  isLoading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getIngredientsApi();
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Failed to fetch ingredients');
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, aciton) => {
        state.isLoading = false;
        state.list = aciton.payload;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, aciton) => {
        state.isLoading = false;
        state.error =
          (aciton.payload as string) ?? 'Failed to fetch ingredients';
      });
  }
});

export const selectIngredients = (state: RootState) => state.ingredients.list;
export const selectIngredientsIsLoading = (state: RootState) =>
  state.ingredients.isLoading;
export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;

export default ingredientsSlice.reducer;
