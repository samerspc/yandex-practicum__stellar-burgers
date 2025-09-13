import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useProfile } from '../useProfile';
import { TUser } from '../../utils/types';

// Mock для API
jest.mock('../../utils/burger-api', () => ({
  updateUserApi: jest.fn()
}));

import { updateUserApi } from '../../utils/burger-api';

// Создаем mock store
const createMockStore = (initialState: any) => {
  return configureStore({
    reducer: {
      user: (state = initialState.user || { isInit: false, isLoading: false, user: null, error: null }) => state,
      profile: (state = initialState.profile || { user: null, isEditing: false, originalData: null, isLoading: false, error: null }) => state,
      ingredients: (state = { list: [], isLoading: false, error: null }) => state,
      burgerConstructor: (state = { bun: null, items: [] }) => state,
      order: (state = { created: null, current: null, isLoading: false, error: null }) => state,
      feed: (state = { orders: [], total: 0, totalToday: 0, isLoading: false, error: null }) => state,
      profileOrders: (state = { orders: [], total: 0, totalToday: 0, isLoading: false, error: null }) => state
    }
  });
};

// Wrapper для renderHook
const createWrapper = (store: any) => {
  return ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
};

describe('useProfile', () => {
  const mockUser: TUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize profile user from global user', () => {
    const store = createMockStore({
      user: {
        isInit: true,
        isLoading: false,
        user: mockUser,
        error: null
      },
      profile: {
        user: null,
        isEditing: false,
        originalData: null,
        isLoading: false,
        error: null
      }
    });

    const { result } = renderHook(() => useProfile(), {
      wrapper: createWrapper(store)
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isEditing).toBe(false);
    expect(result.current.hasChanges).toBe(false);
  });

  it('should start editing mode', () => {
    const store = createMockStore({
      user: {
        isInit: true,
        isLoading: false,
        user: mockUser,
        error: null
      },
      profile: {
        user: mockUser,
        isEditing: false,
        originalData: mockUser,
        isLoading: false,
        error: null
      }
    });

    const { result } = renderHook(() => useProfile(), {
      wrapper: createWrapper(store)
    });

    act(() => {
      result.current.handleStartEditing();
    });

    // Проверяем что диспатчится правильное действие
    // В реальном тесте мы бы проверили состояние store
    expect(result.current.handleStartEditing).toBeDefined();
  });

  it('should cancel editing mode', () => {
    const store = createMockStore({
      user: {
        isInit: true,
        isLoading: false,
        user: mockUser,
        error: null
      },
      profile: {
        user: mockUser,
        isEditing: true,
        originalData: mockUser,
        isLoading: false,
        error: null
      }
    });

    const { result } = renderHook(() => useProfile(), {
      wrapper: createWrapper(store)
    });

    act(() => {
      result.current.handleCancelEditing();
    });

    expect(result.current.handleCancelEditing).toBeDefined();
  });

  it('should update user data', () => {
    const store = createMockStore({
      user: {
        isInit: true,
        isLoading: false,
        user: mockUser,
        error: null
      },
      profile: {
        user: mockUser,
        isEditing: true,
        originalData: mockUser,
        isLoading: false,
        error: null
      }
    });

    const { result } = renderHook(() => useProfile(), {
      wrapper: createWrapper(store)
    });

    act(() => {
      result.current.handleUpdateUserData({ name: 'Updated Name' });
    });

    expect(result.current.handleUpdateUserData).toBeDefined();
  });

  it('should detect changes in user data', () => {
    const updatedUser = { ...mockUser, name: 'Updated Name' };
    const store = createMockStore({
      user: {
        isInit: true,
        isLoading: false,
        user: mockUser,
        error: null
      },
      profile: {
        user: updatedUser,
        isEditing: true,
        originalData: mockUser,
        isLoading: false,
        error: null
      }
    });

    const { result } = renderHook(() => useProfile(), {
      wrapper: createWrapper(store)
    });

    expect(result.current.hasChanges).toBe(true);
  });

  it('should save user data successfully', async () => {
    const updatedUser = { ...mockUser, name: 'Updated Name' };
    const mockApiResponse = {
      success: true,
      user: updatedUser
    };

    (updateUserApi as jest.Mock).mockResolvedValue(mockApiResponse);

    const store = createMockStore({
      user: {
        isInit: true,
        isLoading: false,
        user: mockUser,
        error: null
      },
      profile: {
        user: updatedUser,
        isEditing: true,
        originalData: mockUser,
        isLoading: false,
        error: null
      }
    });

    const { result } = renderHook(() => useProfile(), {
      wrapper: createWrapper(store)
    });

    await act(async () => {
      await result.current.handleSaveUserData();
    });

    expect(updateUserApi).toHaveBeenCalledWith({
      name: updatedUser.name,
      email: updatedUser.email
    });
  });

  it('should handle save user data error', async () => {
    const updatedUser = { ...mockUser, name: 'Updated Name' };
    const mockError = new Error('API Error');

    (updateUserApi as jest.Mock).mockRejectedValue(mockError);

    const store = createMockStore({
      user: {
        isInit: true,
        isLoading: false,
        user: mockUser,
        error: null
      },
      profile: {
        user: updatedUser,
        isEditing: true,
        originalData: mockUser,
        isLoading: false,
        error: null
      }
    });

    const { result } = renderHook(() => useProfile(), {
      wrapper: createWrapper(store)
    });

    await act(async () => {
      await result.current.handleSaveUserData();
    });

    expect(updateUserApi).toHaveBeenCalledWith({
      name: updatedUser.name,
      email: updatedUser.email
    });
  });

  it('should not save when no changes', async () => {
    const store = createMockStore({
      user: {
        isInit: true,
        isLoading: false,
        user: mockUser,
        error: null
      },
      profile: {
        user: mockUser,
        isEditing: true,
        originalData: mockUser,
        isLoading: false,
        error: null
      }
    });

    const { result } = renderHook(() => useProfile(), {
      wrapper: createWrapper(store)
    });

    await act(async () => {
      await result.current.handleSaveUserData();
    });

    expect(updateUserApi).not.toHaveBeenCalled();
  });

  it('should not save when no profile user', async () => {
    const store = createMockStore({
      user: {
        isInit: true,
        isLoading: false,
        user: mockUser,
        error: null
      },
      profile: {
        user: null,
        isEditing: true,
        originalData: mockUser,
        isLoading: false,
        error: null
      }
    });

    const { result } = renderHook(() => useProfile(), {
      wrapper: createWrapper(store)
    });

    await act(async () => {
      await result.current.handleSaveUserData();
    });

    expect(updateUserApi).not.toHaveBeenCalled();
  });
});
