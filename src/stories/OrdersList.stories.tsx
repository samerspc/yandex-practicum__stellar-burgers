import React from 'react';
import { OrdersListUI } from '@ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/OrdersList',
  component: OrdersListUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px', margin: '20px auto' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof OrdersListUI>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockOrders = [
  {
    _id: '1',
    number: 12345,
    name: 'Бургер с говядиной',
    status: 'done',
    createdAt: '2024-01-25T10:30:00Z',
    updatedAt: '2024-01-25T10:45:00Z',
    ingredients: ['bun', 'beef', 'cheese', 'sauce'],
    ingredientsInfo: [
      {
        _id: 'bun',
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
        _id: 'beef',
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
        _id: 'bun',
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
        _id: 'beef',
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
    date: new Date('2024-01-25T10:30:00Z')
  },
  {
    _id: '2',
    number: 12346,
    name: 'Бургер с курицей',
    status: 'pending',
    createdAt: '2024-01-25T11:00:00Z',
    updatedAt: '2024-01-25T11:00:00Z',
    ingredients: ['bun', 'chicken', 'lettuce', 'sauce'],
    ingredientsInfo: [
      {
        _id: 'bun',
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
        _id: 'chicken',
        name: 'Курица',
        type: 'main',
        proteins: 20,
        fat: 12,
        carbohydrates: 3,
        calories: 220,
        price: 180,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ],
    ingredientsToShow: [
      {
        _id: 'bun',
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
        _id: 'chicken',
        name: 'Курица',
        type: 'main',
        proteins: 20,
        fat: 12,
        carbohydrates: 3,
        calories: 220,
        price: 180,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ],
    remains: 0,
    total: 303,
    date: new Date('2024-01-25T11:00:00Z')
  }
];

export const DefaultOrdersList: Story = {
  args: {
    orderByDate: mockOrders
  }
};

export const EmptyOrdersList: Story = {
  args: {
    orderByDate: []
  }
};
