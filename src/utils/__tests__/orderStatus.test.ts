import {
  getOrderStatus,
  getOrderStatusColor,
  calculateOrderPrice,
  getOrderIngredients
} from '../orderStatus';
import { TOrder, TIngredient } from '../types';

describe('orderStatus utils', () => {
  describe('getOrderStatus', () => {
    it('should return correct status for done', () => {
      expect(getOrderStatus('done')).toBe('Выполнен');
    });

    it('should return correct status for pending', () => {
      expect(getOrderStatus('pending')).toBe('Готовится');
    });

    it('should return correct status for created', () => {
      expect(getOrderStatus('created')).toBe('Создан');
    });

    it('should return correct status for cancelled', () => {
      expect(getOrderStatus('cancelled')).toBe('Отменён');
    });

    it('should return default status for unknown status', () => {
      expect(getOrderStatus('unknown')).toBe('Неизвестно');
    });
  });

  describe('getOrderStatusColor', () => {
    it('should return correct color for done', () => {
      expect(getOrderStatusColor('done')).toBe('#00CCCC');
    });

    it('should return correct color for pending', () => {
      expect(getOrderStatusColor('pending')).toBe('#F2C94C');
    });

    it('should return correct color for created', () => {
      expect(getOrderStatusColor('created')).toBe('#F2C94C');
    });

    it('should return correct color for cancelled', () => {
      expect(getOrderStatusColor('cancelled')).toBe('#E52B50');
    });

    it('should return default color for unknown status', () => {
      expect(getOrderStatusColor('unknown')).toBe('#8585AD');
    });
  });

  describe('calculateOrderPrice', () => {
    const mockIngredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Булочка',
        type: 'bun',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 100,
        price: 50,
        image: 'bun.jpg',
        image_large: 'bun-large.jpg',
        image_mobile: 'bun-mobile.jpg'
      },
      {
        _id: '2',
        name: 'Котлета',
        type: 'main',
        proteins: 20,
        fat: 10,
        carbohydrates: 5,
        calories: 200,
        price: 100,
        image: 'patty.jpg',
        image_large: 'patty-large.jpg',
        image_mobile: 'patty-mobile.jpg'
      }
    ];

    const mockOrder: TOrder = {
      _id: 'order1',
      status: 'done',
      name: 'Тестовый заказ',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      number: 1,
      ingredients: ['1', '2', '1'] // булочка, котлета, булочка
    };

    it('should calculate correct price for order with ingredients', () => {
      const price = calculateOrderPrice(mockOrder, mockIngredients);
      expect(price).toBe(200); // 50 + 100 + 50
    });

    it('should return 0 for order without ingredients', () => {
      const orderWithoutIngredients: TOrder = {
        ...mockOrder,
        ingredients: []
      };
      const price = calculateOrderPrice(orderWithoutIngredients, mockIngredients);
      expect(price).toBe(0);
    });

    it('should return 0 for empty ingredients array', () => {
      const price = calculateOrderPrice(mockOrder, []);
      expect(price).toBe(0);
    });

    it('should handle missing ingredients gracefully', () => {
      const orderWithMissingIngredient: TOrder = {
        ...mockOrder,
        ingredients: ['1', '2', '3'] // ingredient 3 doesn't exist
      };
      const price = calculateOrderPrice(orderWithMissingIngredient, mockIngredients);
      expect(price).toBe(150); // 50 + 100 + 0
    });
  });

  describe('getOrderIngredients', () => {
    const mockIngredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Булочка',
        type: 'bun',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 100,
        price: 50,
        image: 'bun.jpg',
        image_large: 'bun-large.jpg',
        image_mobile: 'bun-mobile.jpg'
      },
      {
        _id: '2',
        name: 'Котлета',
        type: 'main',
        proteins: 20,
        fat: 10,
        carbohydrates: 5,
        calories: 200,
        price: 100,
        image: 'patty.jpg',
        image_large: 'patty-large.jpg',
        image_mobile: 'patty-mobile.jpg'
      }
    ];

    const mockOrder: TOrder = {
      _id: 'order1',
      status: 'done',
      name: 'Тестовый заказ',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      number: 1,
      ingredients: ['1', '2', '1'] // булочка, котлета, булочка
    };

    it('should return ingredients with correct counts', () => {
      const result = getOrderIngredients(mockOrder, mockIngredients);
      
      expect(result).toHaveLength(2);
      
      const bun = result.find(item => item._id === '1');
      const patty = result.find(item => item._id === '2');
      
      expect(bun).toBeDefined();
      expect(bun?.count).toBe(2);
      expect(bun?.name).toBe('Булочка');
      
      expect(patty).toBeDefined();
      expect(patty?.count).toBe(1);
      expect(patty?.name).toBe('Котлета');
    });

    it('should return empty array for order without ingredients', () => {
      const orderWithoutIngredients: TOrder = {
        ...mockOrder,
        ingredients: []
      };
      const result = getOrderIngredients(orderWithoutIngredients, mockIngredients);
      expect(result).toEqual([]);
    });

    it('should return empty array for empty ingredients array', () => {
      const result = getOrderIngredients(mockOrder, []);
      expect(result).toEqual([]);
    });

    it('should filter out missing ingredients', () => {
      const orderWithMissingIngredient: TOrder = {
        ...mockOrder,
        ingredients: ['1', '2', '3'] // ingredient 3 doesn't exist
      };
      const result = getOrderIngredients(orderWithMissingIngredient, mockIngredients);
      
      expect(result).toHaveLength(2);
      expect(result.every(item => item._id !== '3')).toBe(true);
    });
  });
});
