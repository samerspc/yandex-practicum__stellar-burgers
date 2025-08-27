import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../../utils/types';
import { RootState } from '../store';

type ProfileState = {
  user: TUser | null;
  isEditing: boolean;
  originalData: TUser | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: ProfileState = {
  user: null,
  isEditing: false,
  originalData: null,
  isLoading: false,
  error: null
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.originalData = action.payload;
    },
    startEditing: (state) => {
      state.isEditing = true;
      state.originalData = state.user;
    },
    cancelEditing: (state) => {
      state.isEditing = false;
      if (state.originalData) {
        state.user = state.originalData;
      }
    },
    updateUserData: (state, action: PayloadAction<Partial<TUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    saveUserData: (state) => {
      state.isEditing = false;
      state.originalData = state.user;
      state.error = null;
    },
    setProfileLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setProfileError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearProfile: (state) => {
      state.user = null;
      state.isEditing = false;
      state.originalData = null;
      state.error = null;
    }
  }
});

export const {
  setUser,
  startEditing,
  cancelEditing,
  updateUserData,
  saveUserData,
  setProfileLoading,
  setProfileError,
  clearProfile
} = profileSlice.actions;

export default profileSlice.reducer;
export const selectProfileState = (state: RootState) => state.profile;
export const selectProfileUser = (state: RootState) => state.profile.user;
export const selectProfileIsEditing = (state: RootState) =>
  state.profile.isEditing;
export const selectProfileOriginalData = (state: RootState) =>
  state.profile.originalData;
export const selectProfileLoading = (state: RootState) =>
  state.profile.isLoading;
export const selectProfileError = (state: RootState) => state.profile.error;
export const selectProfileHasChanges = (state: RootState) => {
  const { user, originalData } = state.profile;
  if (!user || !originalData) return false;
  return user.name !== originalData.name || user.email !== originalData.email;
};
