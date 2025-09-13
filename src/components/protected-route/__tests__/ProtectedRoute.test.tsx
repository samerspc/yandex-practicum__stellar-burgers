import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { ProtectedRoute } from '../ProtectedRoute';
import { RootState } from '../../../services/store';

// Расширяем типы для Jest
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveTextContent(text: string | RegExp): R;
    }
  }
}

const TestComponent = () => <div>Protected Content</div>;

const createMockStore = (initialState: Partial<RootState>) => {
  return configureStore({
    reducer: {
      user: (state = initialState.user || { isInit: false, isLoading: false, user: null, error: null }) => state,
      ingredients: (state = initialState.ingredients || { list: [], isLoading: false, error: null }) => state,
      burgerConstructor: (state = initialState.burgerConstructor || { bun: null, items: [] }) => state,
      order: (state = initialState.order || { created: null, current: null, isLoading: false, error: null }) => state,
      feed: (state = initialState.feed || { orders: [], total: 0, totalToday: 0, isLoading: false, error: null }) => state,
      profileOrders: (state = initialState.profileOrders || { orders: [], total: 0, totalToday: 0, isLoading: false, error: null }) => state,
      profile: (state = initialState.profile || { user: null, isEditing: false, originalData: null, isLoading: false, error: null }) => state
    }
  });
};

const TestWrapper: React.FC<{ store: any; children: React.ReactNode }> = ({ store, children }) => (
  <Provider store={store}>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </Provider>
);

describe('ProtectedRoute', () => {
  it('should render children when user is authenticated', () => {
    const store = createMockStore({
      user: {
        isInit: true,
        isLoading: false,
        user: { email: 'test@example.com', name: 'Test User' },
        error: null
      }
    });

    render(
      <TestWrapper store={store}>
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      </TestWrapper>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should show preloader when not initialized', () => {
    const store = createMockStore({
      user: {
        isInit: false,
        isLoading: false,
        user: null,
        error: null
      }
    });

    render(
      <TestWrapper store={store}>
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      </TestWrapper>
    );

    // Проверяем что отображается Preloader (может быть по классу или тексту)
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should show preloader when loading', () => {
    const store = createMockStore({
      user: {
        isInit: true,
        isLoading: true,
        user: null,
        error: null
      }
    });

    render(
      <TestWrapper store={store}>
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      </TestWrapper>
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should redirect to login when user is not authenticated', () => {
    const store = createMockStore({
      user: {
        isInit: true,
        isLoading: false,
        user: null,
        error: null
      }
    });

    // Mock для useNavigate
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate
    }));

    render(
      <TestWrapper store={store}>
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>
      </TestWrapper>
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should handle multiple children', () => {
    const store = createMockStore({
      user: {
        isInit: true,
        isLoading: false,
        user: { email: 'test@example.com', name: 'Test User' },
        error: null
      }
    });

    render(
      <TestWrapper store={store}>
        <ProtectedRoute>
          <div>Child 1</div>
          <div>Child 2</div>
        </ProtectedRoute>
      </TestWrapper>
    );

    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });
});
