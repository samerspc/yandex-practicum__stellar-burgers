# 🍔 Stellar Burgers - React Application

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue?style=for-the-badge&logo=typescript)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-1.9.0-purple?style=for-the-badge&logo=redux)
![React Router](https://img.shields.io/badge/React_Router-6.8.0-red?style=for-the-badge&logo=react-router)

**Современное веб-приложение для заказа бургеров с полным функционалом авторизации и управления заказами**

[![Demo](https://img.shields.io/badge/Live_Demo-View_Project-green?style=for-the-badge)](https://your-demo-link.com)
[![Figma Design](https://img.shields.io/badge/Figma-Design_System-orange?style=for-the-badge&logo=figma)](https://www.figma.com/file/vIywAvqfkOIRWGOkfOnReY/React-Fullstack_-Проектные-задачи-(3-месяца)_external_link?type=design&node-id=0-1&mode=design)

</div>

---

## Технологии

<div align="center">

| Frontend | State Management | Routing | Styling | Build Tools |
|----------|------------------|---------|---------|-------------|
| ![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react) | ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-1.9.0-764ABC?style=flat-square&logo=redux) | ![React Router](https://img.shields.io/badge/React_Router-6.8.0-CA4245?style=flat-square&logo=react-router) | ![CSS Modules](https://img.shields.io/badge/CSS_Modules-✓-1572B6?style=flat-square&logo=css3) | ![Webpack](https://img.shields.io/badge/Webpack-5.0.0-8DD6F9?style=flat-square&logo=webpack) |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6?style=flat-square&logo=typescript) | ![React Redux](https://img.shields.io/badge/React_Redux-8.0.0-764ABC?style=flat-square&logo=redux) | | ![Styled Components](https://img.shields.io/badge/Styled_Components-✓-DB7093?style=flat-square) | ![Storybook](https://img.shields.io/badge/Storybook-6.5.0-FF4785?style=flat-square&logo=storybook) |

</div>

---

## Функционал

### Авторизация
- ✅ Регистрация новых пользователей
- ✅ Вход в систему
- ✅ Восстановление пароля
- ✅ Защищенные маршруты
- ✅ Автоматическая инициализация пользователя

### Конструктор бургеров
- ✅ Drag & Drop ингредиентов
- ✅ Добавление/удаление ингредиентов
- ✅ Перемещение ингредиентов
- ✅ Подсчет стоимости в реальном времени
- ✅ Создание заказов (только для авторизованных)

### Лента заказов
- ✅ Публичная лента всех заказов
- ✅ Статистика заказов (общее количество, за сегодня)
- ✅ Детальная информация о заказе
- ✅ Статусы заказов (готовится, готов, отменен)

### Профиль пользователя
- ✅ Редактирование личных данных
- ✅ История заказов пользователя
- ✅ Выход из системы
- ✅ Навигационное меню

### UI/UX
- ✅ Адаптивный дизайн
- ✅ Модальные окна
- ✅ Анимации и переходы
- ✅ Интерактивные элементы
- ✅ Состояния загрузки

---

## Архитектура

```
src/
├── components/          # React компоненты
│   ├── app/            # Основные компоненты приложения
│   ├── ui/             # UI компоненты
│   └── protected-route/ # Компоненты авторизации
├── pages/              # Страницы приложения
├── services/           # Redux store и слайсы
│   └── slices/         # Redux Toolkit слайсы
├── utils/              # Утилиты и API
├── hooks/              # Кастомные React хуки
└── stories/            # Storybook истории
```

### Документация Redux Slices

Подробная документация по всем Redux слайсам доступна в [src/services/slices/README.md](src/services/slices/README.md)

---

## Быстрый старт

### Предварительные требования
- Node.js 16+ 
- npm или yarn

### Установка

```bash
# Клонирование репозитория
git clone https://github.com/your-username/stellar-burgers.git
cd stellar-burgers

# Установка зависимостей
npm install

# Настройка переменных окружения
cp .env.example .env
# Добавьте BURGER_API_URL в .env файл
```

### Запуск

```bash
# Режим разработки
npm start

# Сборка для продакшена
npm run build

# Запуск Storybook
npm run storybook
```
---

## API Endpoints

Приложение использует REST API для взаимодействия с сервером:

- `GET /api/ingredients` - получение ингредиентов
- `POST /api/orders` - создание заказа
- `GET /api/orders/all` - получение ленты заказов
- `GET /api/orders` - получение заказов пользователя
- `POST /api/auth/register` - регистрация
- `POST /api/auth/login` - вход
- `POST /api/auth/logout` - выход
- `GET /api/auth/user` - получение данных пользователя
- `PATCH /api/auth/user` - обновление данных пользователя

---

## Тестирование

```bash
# Запуск тестов
npm test

# Запуск тестов с покрытием
npm run test:coverage

# Запуск Storybook для тестирования компонентов
npm run storybook
```

---

## Сборка и деплой

```bash
# Сборка для продакшена
npm run build

# Предварительный просмотр сборки
npm run preview

# Анализ размера бандла
npm run analyze
```
---

## Лицензия

Этот проект создан в рамках обучения в [Яндекс.Практикум](https://practicum.yandex.ru/)

---
