import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { BurgerConstructor } from '../burger-constructor';
import { TIngredient, TConstructorIngredient } from '../../../utils/types';

// Расширяем типы для Jest
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveTextContent(text: string | RegExp): R;
    }
  }
}

// Mock для UI компонента
jest.mock('../../ui/burger-constructor', () => ({
  BurgerConstructorUI: ({ 
    price, 
    orderRequest, 
    constructorItems, 
    orderModalData, 
    onOrderClick, 
    closeOrderModal 
  }: any) => (
    <div data-testid="burger-constructor-ui">
      <div data-testid="price">{price}</div>
      <div data-testid="order-request">{orderRequest.toString()}</div>
      <div data-testid="bun">{constructorItems.bun?.name || 'No bun'}</div>
      <div data-testid="ingredients-count">{constructorItems.ingredients?.length || 0}</div>
      <button data-testid="order-button" onClick={onOrderClick}>
        Оформить заказ
      </button>
      {orderModalData && (
        <div data-testid="order-modal">
          <div data-testid="order-number">{orderModalData.number}</div>
          <button data-testid="close-modal" onClick={closeOrderModal}>
            Закрыть
          </button>
        </div>
      )}
    </div>
  )
}));

// Mock для API
jest.mock('../../../utils/burger-api', () => ({
  orderBurgerApi: jest.fn()
}));

// Mock для useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Создаем mock store
const createMockStore = (initialState: any) => {
  return configureStore({
    reducer: {
      burgerConstructor: (state = initialState.burgerConstructor || { bun: null, items: [] }) => state,
      order: (state = initialState.order || { created: null, current: null, isLoading: false, error: null }) => state,
      user: (state = initialState.user || { isInit: false, isLoading: false, user: null, error: null }) => state,
      ingredients: (state = { list: [], isLoading: false, error: null }) => state,
      feed: (state = { orders: [], total: 0, totalToday: 0, isLoading: false, error: null }) => state,
      profileOrders: (state = { orders: [], total: 0, totalToday: 0, isLoading: false, error: null }) => state,
      profile: (state = { user: null, isEditing: false, originalData: null, isLoading: false, error: null }) => state
    }
  });
};

// Wrapper компонент для тестов
const TestWrapper: React.FC<{ store: any; children: React.ReactNode }> = ({ store, children }) => (
  <Provider store={store}>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </Provider>
);

describe('BurgerConstructor Integration', () => {
  const mockBun: TIngredient = {
    _id: 'bun-1',
    name: 'Краторная булка',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'bun.jpg',
    image_large: 'bun-large.jpg',
    image_mobile: 'bun-mobile.jpg'
  };

  const mockIngredient: TIngredient = {
    _id: 'ingredient-1',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 168,
    calories: 4242,
    price: 424,
    image: 'ingredient.jpg',
    image_large: 'ingredient-large.jpg',
    image_mobile: 'ingredient-mobile.jpg'
  };

  const mockConstructorIngredient: TConstructorIngredient = {
    ...mockIngredient,
    id: 'ingredient-1_1234567890'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should calculate correct price with bun and ingredients', () => {
    const store = createMockStore({
      burgerConstructor: {
        bun: mockBun,
        items: [mockConstructorIngredient]
      },
      user: {
        isInit: true,
        isLoading: false,
        user: { email: 'test@example.com', name: 'Test User' },
        error: null
      }
    });

    render(
      <TestWrapper store={store}>
        <BurgerConstructor />
      </TestWrapper>
    );

    // Цена = (булочка * 2) + ингредиенты = (1255 * 2) + 424 = 2934
    expect(screen.getByTestId('price')).toHaveTextContent('2934');
  });

  it('should show correct bun and ingredients count', () => {
    const store = createMockStore({
      burgerConstructor: {
        bun: mockBun,
        items: [mockConstructorIngredient, mockConstructorIngredient]
      },
      user: {
        isInit: true,
        isLoading: false,
        user: { email: 'test@example.com', name: 'Test User' },
        error: null
      }
    });

    render(
      <TestWrapper store={store}>
        <BurgerConstructor />
      </TestWrapper>
    );

    expect(screen.getByTestId('bun')).toHaveTextContent('Краторная булка');
    expect(screen.getByTestId('ingredients-count')).toHaveTextContent('2');
  });

  it('should redirect to login when user is not authenticated', async () => {
    const user = userEvent.setup();
    const store = createMockStore({
      burgerConstructor: {
        bun: mockBun,
        items: [mockConstructorIngredient]
      },
      user: {
        isInit: true,
        isLoading: false,
        user: null,
        error: null
      }
    });

    render(
      <TestWrapper store={store}>
        <BurgerConstructor />
      </TestWrapper>
    );

    const orderButton = screen.getByTestId('order-button');
    await user.click(orderButton);

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('should not allow order without bun', async () => {
    const user = userEvent.setup();
    const store = createMockStore({
      burgerConstructor: {
        bun: null,
        items: [mockConstructorIngredient]
      },
      user: {
        isInit: true,
        isLoading: false,
        user: { email: 'test@example.com', name: 'Test User' },
        error: null
      }
    });

    render(
      <TestWrapper store={store}>
        <BurgerConstructor />
      </TestWrapper>
    );

    const orderButton = screen.getByTestId('order-button');
    await user.click(orderButton);

    // Не должно быть навигации или API вызова
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should not allow order without ingredients', async () => {
    const user = userEvent.setup();
    const store = createMockStore({
      burgerConstructor: {
        bun: mockBun,
        items: []
      },
      user: {
        isInit: true,
        isLoading: false,
        user: { email: 'test@example.com', name: 'Test User' },
        error: null
      }
    });

    render(
      <TestWrapper store={store}>
        <BurgerConstructor />
      </TestWrapper>
    );

    const orderButton = screen.getByTestId('order-button');
    await user.click(orderButton);

    // Не должно быть навигации или API вызова
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should show loading state during order creation', () => {
    const store = createMockStore({
      burgerConstructor: {
        bun: mockBun,
        items: [mockConstructorIngredient]
      },
      order: {
        created: null,
        current: null,
        isLoading: true,
        error: null
      },
      user: {
        isInit: true,
        isLoading: false,
        user: { email: 'test@example.com', name: 'Test User' },
        error: null
      }
    });

    render(
      <TestWrapper store={store}>
        <BurgerConstructor />
      </TestWrapper>
    );

    expect(screen.getByTestId('order-request')).toHaveTextContent('true');
  });

  it('should show order modal when order is created', () => {
    const mockOrder = {
      _id: 'order-1',
      status: 'done',
      name: 'Тестовый заказ',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      number: 12345,
      ingredients: ['bun-1', 'ingredient-1', 'bun-1']
    };

    const store = createMockStore({
      burgerConstructor: {
        bun: mockBun,
        items: [mockConstructorIngredient]
      },
      order: {
        created: mockOrder,
        current: null,
        isLoading: false,
        error: null
      },
      user: {
        isInit: true,
        isLoading: false,
        user: { email: 'test@example.com', name: 'Test User' },
        error: null
      }
    });

    render(
      <TestWrapper store={store}>
        <BurgerConstructor />
      </TestWrapper>
    );

    expect(screen.getByTestId('order-modal')).toBeInTheDocument();
    expect(screen.getByTestId('order-number')).toHaveTextContent('12345');
  });

  it('should close order modal when close button is clicked', async () => {
    const user = userEvent.setup();
    const mockOrder = {
      _id: 'order-1',
      status: 'done',
      name: 'Тестовый заказ',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      number: 12345,
      ingredients: ['bun-1', 'ingredient-1', 'bun-1']
    };

    const store = createMockStore({
      burgerConstructor: {
        bun: mockBun,
        items: [mockConstructorIngredient]
      },
      order: {
        created: mockOrder,
        current: null,
        isLoading: false,
        error: null
      },
      user: {
        isInit: true,
        isLoading: false,
        user: { email: 'test@example.com', name: 'Test User' },
        error: null
      }
    });

    render(
      <TestWrapper store={store}>
        <BurgerConstructor />
      </TestWrapper>
    );

    const closeButton = screen.getByTestId('close-modal');
    await user.click(closeButton);

    // Проверяем что window.history.back был вызван
    expect(window.history.back).toHaveBeenCalled();
  });
});
