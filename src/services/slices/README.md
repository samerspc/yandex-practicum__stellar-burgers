# Redux Slices Documentation

## Slices Description

### 1. `ingredientsSlice.ts` - Ингредиенты

Управляет состоянием ингредиентов бургеров.

**State:**

- `list` - массив всех ингредиентов
- `isLoading` - состояние загрузки
- `error` - ошибки

**Actions:**

- `fetchIngredients()` - загрузка ингредиентов с сервера

### 2. `userSlice.ts` - Пользователь

Управляет состоянием авторизации и данных пользователя.

**State:**

- `user` - данные пользователя
- `isInit` - инициализация приложения
- `isLoading` - состояние загрузки
- `error` - ошибки

**Actions:**

- `loginUser()` - вход пользователя
- `registerUser()` - регистрация пользователя
- `logoutUser()` - выход пользователя
- `fetchUser()` - получение данных пользователя
- `updateUser()` - обновление данных пользователя
- `init()` - инициализация приложения

### 3. `constructorSlice.ts` - Конструктор бургера

Управляет состоянием конструктора бургера.

**State:**

- `bun` - выбранная булка
- `items` - выбранные ингредиенты

**Actions:**

- `setBun()` - установка булки
- `addItem()` - добавление ингредиента
- `removeItem()` - удаление ингредиента
- `reorderItems()` - перемещение ингредиентов
- `reset()` - сброс конструктора

### 4. `orderSlice.ts` - Заказы

Управляет состоянием создания и получения заказов.

**State:**

- `created` - созданный заказ
- `current` - текущий заказ
- `isLoading` - состояние загрузки
- `error` - ошибки

**Actions:**

- `createOrder()` - создание заказа
- `fetchOrderByNumber()` - получение заказа по номеру
- `clearCreated()` - очистка созданного заказа

### 5. `feedSlice.ts` - Лента заказов

Управляет состоянием публичной ленты заказов.

**State:**

- `orders` - массив заказов
- `total` - общее количество заказов
- `totalToday` - количество заказов за сегодня
- `isLoading` - состояние загрузки
- `error` - ошибки

**Actions:**

- `fetchFeeds()` - загрузка заказов с сервера
- `clearFeed()` - очистка ленты

### 6. `profileOrdersSlice.ts` - История заказов пользователя

Управляет состоянием истории заказов пользователя.

**State:**

- `orders` - массив заказов пользователя
- `total` - общее количество заказов пользователя
- `totalToday` - количество заказов пользователя за сегодня
- `isLoading` - состояние загрузки
- `error` - ошибки

**Actions:**

- `fetchProfileOrders()` - загрузка заказов пользователя
- `clearProfileOrders()` - очистка истории заказов

### 7. `profileSlice.ts` - Профиль пользователя

Управляет состоянием профиля пользователя и редактированием данных.

**State:**

- `user` - данные пользователя
- `isEditing` - режим редактирования
- `originalData` - оригинальные данные для отмены изменений
- `isLoading` - состояние загрузки
- `error` - ошибки

**Actions:**

- `setUser()` - установка данных пользователя
- `startEditing()` - начало редактирования
- `cancelEditing()` - отмена редактирования
- `updateUserData()` - обновление данных пользователя
- `saveUserData()` - сохранение данных пользователя
- `setProfileLoading()` - установка состояния загрузки
- `setProfileError()` - установка ошибки
- `clearProfile()` - очистка профиля

## Usage Example

```typescript
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFeedOrders,
  selectFeedTotal,
  selectFeedTotalToday,
  selectFeedLoading,
  selectFeedError,
  fetchFeeds
} from '../services/slices/feedSlice';

const FeedComponent = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);
  const total = useSelector(selectFeedTotal);
  const totalToday = useSelector(selectFeedTotalToday);
  const isLoading = useSelector(selectFeedLoading);
  const error = useSelector(selectFeedError);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Order Feed</h2>
      <p>Total orders: {total}</p>
      <p>Orders today: {totalToday}</p>
      {orders.map(order => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
};
```
