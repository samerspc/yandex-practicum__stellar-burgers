import { OrderCardUI } from '@ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/OrderCard',
  component: OrderCardUI,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof OrderCardUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultOrderCard: Story = {
  args: {
    orderInfo: {
      ingredientsInfo: [
        {
          _id: '111',
          name: 'Булка',
          type: 'bun',
          proteins: 12,
          fat: 33,
          carbohydrates: 22,
          calories: 33,
          price: 123,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        {
          _id: '222',
          name: 'Говядина',
          type: 'main',
          proteins: 25,
          fat: 18,
          carbohydrates: 5,
          calories: 280,
          price: 200,
          image: '',
          image_large: '',
          image_mobile: ''
        }
      ],
      ingredientsToShow: [
        {
          _id: '111',
          name: 'Булка',
          type: 'bun',
          proteins: 12,
          fat: 33,
          carbohydrates: 22,
          calories: 33,
          price: 123,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        {
          _id: '222',
          name: 'Говядина',
          type: 'main',
          proteins: 25,
          fat: 18,
          carbohydrates: 5,
          calories: 280,
          price: 200,
          image: '',
          image_large: '',
          image_mobile: ''
        }
      ],
      remains: 0,
      total: 323,
      date: new Date('2024-01-25T10:30:00Z'),
      _id: '32',
      status: 'done',
      name: 'Бургер с говядиной',
      createdAt: '2024-01-25T10:30:00Z',
      updatedAt: '2024-01-25T10:45:00Z',
      number: 12345,
      ingredients: ['bun', 'beef']
    },
    maxIngredients: 5,
    locationState: {
      background: {
        hash: '',
        key: 'eitkep27',
        pathname: '/',
        search: '',
        state: null
      }
    }
  }
};

export const OrderCardWithManyIngredients: Story = {
  args: {
    orderInfo: {
      ingredientsInfo: [
        {
          _id: '111',
          name: 'Булка',
          type: 'bun',
          proteins: 12,
          fat: 33,
          carbohydrates: 22,
          calories: 33,
          price: 123,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        {
          _id: '222',
          name: 'Говядина',
          type: 'main',
          proteins: 25,
          fat: 18,
          carbohydrates: 5,
          calories: 280,
          price: 200,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        {
          _id: '333',
          name: 'Сыр',
          type: 'main',
          proteins: 15,
          fat: 25,
          carbohydrates: 2,
          calories: 180,
          price: 150,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        {
          _id: '444',
          name: 'Соус',
          type: 'sauce',
          proteins: 8,
          fat: 15,
          carbohydrates: 18,
          calories: 25,
          price: 50,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        {
          _id: '555',
          name: 'Салат',
          type: 'main',
          proteins: 5,
          fat: 2,
          carbohydrates: 8,
          calories: 30,
          price: 80,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        {
          _id: '666',
          name: 'Помидор',
          type: 'main',
          proteins: 3,
          fat: 1,
          carbohydrates: 6,
          calories: 20,
          price: 60,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        {
          _id: '777',
          name: 'Огурец',
          type: 'main',
          proteins: 2,
          fat: 1,
          carbohydrates: 4,
          calories: 15,
          price: 40,
          image: '',
          image_large: '',
          image_mobile: ''
        }
      ],
      ingredientsToShow: [
        {
          _id: '111',
          name: 'Булка',
          type: 'bun',
          proteins: 12,
          fat: 33,
          carbohydrates: 22,
          calories: 33,
          price: 123,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        {
          _id: '222',
          name: 'Говядина',
          type: 'main',
          proteins: 25,
          fat: 18,
          carbohydrates: 5,
          calories: 280,
          price: 200,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        {
          _id: '333',
          name: 'Сыр',
          type: 'main',
          proteins: 15,
          fat: 25,
          carbohydrates: 2,
          calories: 180,
          price: 150,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        {
          _id: '444',
          name: 'Соус',
          type: 'sauce',
          proteins: 8,
          fat: 15,
          carbohydrates: 18,
          calories: 25,
          price: 50,
          image: '',
          image_large: '',
          image_mobile: ''
        },
        {
          _id: '555',
          name: 'Салат',
          type: 'main',
          proteins: 5,
          fat: 2,
          carbohydrates: 8,
          calories: 30,
          price: 80,
          image: '',
          image_large: '',
          image_mobile: ''
        }
      ],
      remains: 2,
      total: 703,
      date: new Date('2024-01-25T11:00:00Z'),
      _id: '33',
      status: 'pending',
      name: 'Мега бургер',
      createdAt: '2024-01-25T11:00:00Z',
      updatedAt: '2024-01-25T11:00:00Z',
      number: 12346,
      ingredients: [
        'bun',
        'beef',
        'cheese',
        'sauce',
        'lettuce',
        'tomato',
        'cucumber'
      ]
    },
    maxIngredients: 5,
    locationState: {
      background: {
        hash: '',
        key: 'eitkep27',
        pathname: '/',
        search: '',
        state: null
      }
    }
  }
};
