import { Routes, Route } from 'react-router-dom';

import { Modal, OrderInfo, IngredientDetails } from '@components';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

import { ProtectedRoute, AuthRoute } from '../protected-route';
import { AppHeader } from '@components';
import { AppInitializer } from './AppInitializer';

import '../../index.css';
import styles from './app.module.css';

const App = () => (
  <div className={styles.app}>
    <AppInitializer />
    <AppHeader />

    <Routes>
      <Route path='/' element={<ConstructorPage />} />

      <Route path='/feed'>
        <Route index element={<Feed />} />
        <Route
          path=':number'
          element={
            <Modal
              title={'Детали заказа'}
              onClose={() => window.history.back()}
            >
              <OrderInfo />
            </Modal>
          }
        />
      </Route>

      <Route
        path='/ingredients/:id'
        element={
          <Modal
            title={'Детали ингредиента'}
            onClose={() => window.history.back()}
          >
            <IngredientDetails />
          </Modal>
        }
      />

      <Route path='/profile'>
        <Route
          index
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='orders/:id'
          element={
            <ProtectedRoute>
              <Modal
                title={'Детали заказа'}
                onClose={() => window.history.back()}
              >
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
        path='/login'
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }
      />

      <Route
        path='/register'
        element={
          <AuthRoute>
            <Register />
          </AuthRoute>
        }
      />

      <Route
        path='/forgot-password'
        element={
          <AuthRoute>
            <ForgotPassword />
          </AuthRoute>
        }
      />

      <Route
        path='/reset-password'
        element={
          <AuthRoute>
            <ResetPassword />
          </AuthRoute>
        }
      />

      <Route path='*' element={<NotFound404 />} />
    </Routes>
  </div>
);

export default App;
