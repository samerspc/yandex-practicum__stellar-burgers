import type { RootState } from '../store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  logoutApi,
  getUserApi,
  updateUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { TUser } from '@utils-types';

type UserState = {
  isInit: boolean;
  isLoading: boolean;
  user: TUser | null;
  error: string | null;
};

const initialState: UserState = {
  isInit: false,
  isLoading: false,
  user: null,
  error: null
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Failed to login user');
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const res = await registerUserApi(data);
      return res.user;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserApi();
      return res.user;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const res = await updateUserApi(userData);
      return res.user;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      return null;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init: (state) => {
      state.isInit = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isInit = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isInit = true;
        state.user = action.payload;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export const { init } = userSlice.actions;
export default userSlice.reducer;

export const selectUserState = (state: { user: UserState }) => state.user;
export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectIsAuthorized = (state: { user: UserState }) =>
  Boolean(state.user.user);
export const selectUserLoading = (state: { user: UserState }) =>
  state.user.isLoading;
export const selectUserInit = (state: { user: UserState }) => state.user.isInit;
export const selectUserError = (state: { user: UserState }) => state.user.error;
