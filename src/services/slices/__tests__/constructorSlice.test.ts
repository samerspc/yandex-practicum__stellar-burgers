import constructorSlice, {
  setBun,
  addItem,
  removeItem,
  reorderItems,
  reset,
  selectConstructor,
  selectConstructorBun,
  selectConstructorItems
} from '../constructorSlice';
import { TIngredient, TConstructorIngredient } from '../../../utils/types';
import { RootState } from '../../store';

describe('constructorSlice', () => {
  const mockIngredient: TIngredient = {
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
  };

  const mockConstructorIngredient: TConstructorIngredient = {
    ...mockIngredient,
    id: '1_1234567890'
  };

  const initialState = {
    bun: null,
    items: []
  };

  describe('reducers', () => {
    it('should handle initial state', () => {
      expect(constructorSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle setBun', () => {
      const actual = constructorSlice.reducer(initialState, setBun(mockIngredient));
      expect(actual.bun).toEqual(mockIngredient);
    });

    it('should handle addItem', () => {
      const actual = constructorSlice.reducer(initialState, addItem(mockIngredient));
      expect(actual.items).toHaveLength(1);
      expect(actual.items[0]).toMatchObject({
        ...mockIngredient,
        id: expect.any(String)
      });
    });

    it('should handle addItem when items is null', () => {
      const stateWithNullItems = { ...initialState, items: null as any };
      const actual = constructorSlice.reducer(stateWithNullItems, addItem(mockIngredient));
      expect(actual.items).toHaveLength(1);
    });

    it('should handle removeItem', () => {
      const stateWithItems = {
        ...initialState,
        items: [mockConstructorIngredient]
      };
      const actual = constructorSlice.reducer(stateWithItems, removeItem(0));
      expect(actual.items).toHaveLength(0);
    });

    it('should handle removeItem when items is null', () => {
      const stateWithNullItems = { ...initialState, items: null as any };
      const actual = constructorSlice.reducer(stateWithNullItems, removeItem(0));
      expect(actual.items).toEqual([]);
    });

    it('should handle reorderItems', () => {
      const item1 = { ...mockConstructorIngredient, id: '1_1' };
      const item2 = { ...mockConstructorIngredient, id: '1_2' };
      const stateWithItems = {
        ...initialState,
        items: [item1, item2]
      };
      const actual = constructorSlice.reducer(stateWithItems, reorderItems({ from: 0, to: 1 }));
      expect(actual.items[0]).toEqual(item2);
      expect(actual.items[1]).toEqual(item1);
    });

    it('should handle reorderItems when items is null', () => {
      const stateWithNullItems = { ...initialState, items: null as any };
      const actual = constructorSlice.reducer(stateWithNullItems, reorderItems({ from: 0, to: 1 }));
      expect(actual.items).toEqual([]);
    });

    it('should handle reset', () => {
      const stateWithData = {
        bun: mockIngredient,
        items: [mockConstructorIngredient]
      };
      const actual = constructorSlice.reducer(stateWithData, reset());
      expect(actual).toEqual(initialState);
    });
  });

  describe('selectors', () => {
    const mockState: RootState = {
      ingredients: { list: [], isLoading: false, error: null },
      user: { isInit: false, isLoading: false, user: null, error: null },
      burgerConstructor: {
        bun: mockIngredient,
        items: [mockConstructorIngredient]
      },
      order: { created: null, current: null, isLoading: false, error: null },
      feed: { orders: [], total: 0, totalToday: 0, isLoading: false, error: null },
      profileOrders: { orders: [], total: 0, totalToday: 0, isLoading: false, error: null },
      profile: { user: null, isEditing: false, originalData: null, isLoading: false, error: null }
    };

    it('should select constructor state', () => {
      expect(selectConstructor(mockState)).toEqual(mockState.burgerConstructor);
    });

    it('should select constructor bun', () => {
      expect(selectConstructorBun(mockState)).toEqual(mockIngredient);
    });

    it('should select constructor items', () => {
      expect(selectConstructorItems(mockState)).toEqual([mockConstructorIngredient]);
    });
  });
});
