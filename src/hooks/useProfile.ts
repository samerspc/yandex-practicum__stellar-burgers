import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectProfileUser,
  selectProfileIsEditing,
  selectProfileHasChanges,
  setUser,
  startEditing,
  cancelEditing,
  updateUserData,
  saveUserData,
  setProfileLoading,
  setProfileError
} from '../services/slices';
import { selectUser } from '../services/slices/userSlice';
import { updateUserApi } from '../utils/burger-api';

export const useProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const profileUser = useSelector(selectProfileUser);
  const isEditing = useSelector(selectProfileIsEditing);
  const hasChanges = useSelector(selectProfileHasChanges);

  useEffect(() => {
    if (user && !profileUser) {
      dispatch(setUser(user));
    }
  }, [user, profileUser, dispatch]);

  const handleStartEditing = () => {
    dispatch(startEditing());
  };

  const handleCancelEditing = () => {
    dispatch(cancelEditing());
  };

  const handleUpdateUserData = (data: { name?: string; email?: string }) => {
    dispatch(updateUserData(data));
  };

  const handleSaveUserData = async () => {
    if (!profileUser || !hasChanges) return;

    dispatch(setProfileLoading(true));
    dispatch(setProfileError(null));

    try {
      const updatedUser = await updateUserApi({
        name: profileUser.name,
        email: profileUser.email
      });

      dispatch(saveUserData());
      dispatch(setUser(updatedUser.user));
    } catch (error: any) {
      dispatch(
        setProfileError(error?.message || 'Ошибка при обновлении данных')
      );
    } finally {
      dispatch(setProfileLoading(false));
    }
  };

  return {
    user: profileUser,
    isEditing,
    hasChanges,
    handleStartEditing,
    handleCancelEditing,
    handleUpdateUserData,
    handleSaveUserData
  };
};
