import React from 'react';
import { AppHeaderUI } from '@ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/AppHeader',
  component: AppHeaderUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof AppHeaderUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultHeader: Story = {
  args: {
    userName: 'Иван Иванов',
    isConstructorActive: true,
    isFeedActive: false,
    isProfileActive: false
  }
};

export const HeaderWithFeedActive: Story = {
  args: {
    userName: 'Петр Петров',
    isConstructorActive: false,
    isFeedActive: true,
    isProfileActive: false
  }
};

export const HeaderWithProfileActive: Story = {
  args: {
    userName: 'Анна Сидорова',
    isConstructorActive: false,
    isFeedActive: false,
    isProfileActive: true
  }
};

export const HeaderWithoutUser: Story = {
  args: {
    userName: null,
    isConstructorActive: true,
    isFeedActive: false,
    isProfileActive: false
  }
};
