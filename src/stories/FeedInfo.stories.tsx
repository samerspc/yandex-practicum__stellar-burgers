import React from 'react';
import { FeedInfoUI } from '@ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/FeedInfo',
  component: FeedInfoUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px', margin: '20px auto' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof FeedInfoUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultFeedInfo: Story = {
  args: {
    orders: [
      {
        _id: '1',
        number: 12345,
        name: 'Бургер с говядиной',
        status: 'done',
        createdAt: '2024-01-25T10:30:00Z',
        updatedAt: '2024-01-25T10:45:00Z',
        ingredients: ['bun', 'beef', 'cheese', 'sauce']
      },
      {
        _id: '2',
        number: 12346,
        name: 'Бургер с курицей',
        status: 'pending',
        createdAt: '2024-01-25T11:00:00Z',
        updatedAt: '2024-01-25T11:00:00Z',
        ingredients: ['bun', 'chicken', 'lettuce', 'sauce']
      }
    ],
    total: 150,
    totalToday: 25
  }
};

export const EmptyFeedInfo: Story = {
  args: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

export const HighActivityFeedInfo: Story = {
  args: {
    orders: [
      {
        _id: '1',
        number: 12345,
        name: 'Бургер с говядиной',
        status: 'done',
        createdAt: '2024-01-25T10:30:00Z',
        updatedAt: '2024-01-25T10:45:00Z',
        ingredients: ['bun', 'beef', 'cheese', 'sauce']
      }
    ],
    total: 1000,
    totalToday: 150
  }
};
