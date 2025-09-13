import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { FeedInfo } from '../feed-info';
import { TOrder } from '../../../utils/types';

// Расширяем типы для Jest
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveTextContent(text: string | RegExp): R;
    }
  }
}

jest.mock('../../ui/feed-info', () => ({
  FeedInfoUI: ({ feed, readyOrders, pendingOrders }: any) => (
    <div data-testid="feed-info-ui">
      <div data-testid="total">{feed.total}</div>
      <div data-testid="total-today">{feed.totalToday}</div>
      <div data-testid="ready-orders">{readyOrders.join(',')}</div>
      <div data-testid="pending-orders">{pendingOrders.join(',')}</div>
    </div>
  )
}));

const createMockStore = (feedState: any) => {
  return configureStore({
    reducer: {
      feed: (state = feedState) => state,
      user: (state = { isInit: false, isLoading: false, user: null, error: null }) => state,
      ingredients: (state = { list: [], isLoading: false, error: null }) => state,
      burgerConstructor: (state = { bun: null, items: [] }) => state,
      order: (state = { created: null, current: null, isLoading: false, error: null }) => state,
      profileOrders: (state = { orders: [], total: 0, totalToday: 0, isLoading: false, error: null }) => state,
      profile: (state = { user: null, isEditing: false, originalData: null, isLoading: false, error: null }) => state
    }
  });
};

const TestWrapper: React.FC<{ store: any; children: React.ReactNode }> = ({ store, children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

describe('FeedInfo', () => {
  const mockOrders: TOrder[] = [
    {
      _id: '1',
      status: 'done',
      name: 'Заказ 1',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      number: 1,
      ingredients: ['1', '2']
    },
    {
      _id: '2',
      status: 'done',
      name: 'Заказ 2',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      number: 2,
      ingredients: ['1', '3']
    },
    {
      _id: '3',
      status: 'pending',
      name: 'Заказ 3',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      number: 3,
      ingredients: ['1', '4']
    },
    {
      _id: '4',
      status: 'pending',
      name: 'Заказ 4',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      number: 4,
      ingredients: ['1', '5']
    },
    {
      _id: '5',
      status: 'created',
      name: 'Заказ 5',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      number: 5,
      ingredients: ['1', '6']
    }
  ];

  it('should render feed info with correct data', () => {
    const store = createMockStore({
      orders: mockOrders,
      total: 100,
      totalToday: 25,
      isLoading: false,
      error: null
    });

    render(
      <TestWrapper store={store}>
        <FeedInfo />
      </TestWrapper>
    );

    expect(screen.getByTestId('feed-info-ui')).toBeInTheDocument();
    expect(screen.getByTestId('total')).toHaveTextContent('100');
    expect(screen.getByTestId('total-today')).toHaveTextContent('25');
  });

  it('should filter ready orders correctly', () => {
    const store = createMockStore({
      orders: mockOrders,
      total: 100,
      totalToday: 25,
      isLoading: false,
      error: null
    });

    render(
      <TestWrapper store={store}>
        <FeedInfo />
      </TestWrapper>
    );

    const readyOrders = screen.getByTestId('ready-orders').textContent;
    expect(readyOrders).toBe('1,2'); 
  });

  it('should filter pending orders correctly', () => {
    const store = createMockStore({
      orders: mockOrders,
      total: 100,
      totalToday: 25,
      isLoading: false,
      error: null
    });

    render(
      <TestWrapper store={store}>
        <FeedInfo />
      </TestWrapper>
    );

    const pendingOrders = screen.getByTestId('pending-orders').textContent;
    expect(pendingOrders).toBe('3,4'); // только заказы со статусом 'pending'
  });

  it('should limit orders to 20 items', () => {
    // Создаем 25 заказов со статусом 'done'
    const manyOrders = Array.from({ length: 25 }, (_, i) => ({
      _id: `${i + 1}`,
      status: 'done' as const,
      name: `Заказ ${i + 1}`,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      number: i + 1,
      ingredients: ['1', '2']
    }));

    const store = createMockStore({
      orders: manyOrders,
      total: 100,
      totalToday: 25,
      isLoading: false,
      error: null
    });

    render(
      <TestWrapper store={store}>
        <FeedInfo />
      </TestWrapper>
    );

    const readyOrders = screen.getByTestId('ready-orders').textContent;
    const orderNumbers = readyOrders?.split(',').map(Number) || [];
    
    expect(orderNumbers).toHaveLength(20);
    expect(Math.max(...orderNumbers)).toBe(20); // последний номер должен быть 20
  });

  it('should handle empty orders array', () => {
    const store = createMockStore({
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: false,
      error: null
    });

    render(
      <TestWrapper store={store}>
        <FeedInfo />
      </TestWrapper>
    );

    expect(screen.getByTestId('total')).toHaveTextContent('0');
    expect(screen.getByTestId('total-today')).toHaveTextContent('0');
    expect(screen.getByTestId('ready-orders')).toHaveTextContent('');
    expect(screen.getByTestId('pending-orders')).toHaveTextContent('');
  });

  it('should handle orders with different statuses', () => {
    const mixedOrders: TOrder[] = [
      { ...mockOrders[0], status: 'done' },
      { ...mockOrders[1], status: 'pending' },
      { ...mockOrders[2], status: 'created' },
      { ...mockOrders[3], status: 'cancelled' }
    ];

    const store = createMockStore({
      orders: mixedOrders,
      total: 4,
      totalToday: 4,
      isLoading: false,
      error: null
    });

    render(
      <TestWrapper store={store}>
        <FeedInfo />
      </TestWrapper>
    );

    const readyOrders = screen.getByTestId('ready-orders').textContent;
    const pendingOrders = screen.getByTestId('pending-orders').textContent;

    expect(readyOrders).toBe('1');
    expect(pendingOrders).toBe('2');
  });
});
