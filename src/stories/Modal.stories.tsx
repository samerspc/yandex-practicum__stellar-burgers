import React from 'react';
import { Modal } from '@components';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '20px' }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultModal: Story = {
  args: {
    title: 'Заголовок модального окна',
    onClose: () => {},
    children: (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Содержимое модального окна</p>
        <button onClick={() => {}}>Кнопка</button>
      </div>
    )
  }
};

export const ModalWithLongContent: Story = {
  args: {
    title: 'Модальное окно с длинным содержимым',
    onClose: () => {},
    children: (
      <div style={{ padding: '20px' }}>
        <p>
          Это модальное окно содержит много текста для демонстрации прокрутки.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
        </p>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </p>
      </div>
    )
  }
};

export const ModalWithoutTitle: Story = {
  args: {
    onClose: () => {},
    children: (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Модальное окно без заголовка</p>
      </div>
    )
  }
};
