import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';

const App = () => (
  <BrowserRouter>
    <div className={styles.app}>
      <AppHeader />

      <Routes>
        <Route path='/' element={<ConstructorPage />} />

        <Route path='/feed'>
          <Route index element={<Feed />} />
          <Route
            path=':number'
            element={
              <Modal title={'2'} onClose={() => {}}>
                <OrderInfo />
              </Modal>
            }
          />
        </Route>

        <Route
          path='/ingredients/:id'
          element={
            <Modal title={'2'} onClose={() => {}}>
              <IngredientDetails />
            </Modal>
          }
        />

        <Route path='/profile'>
          <Route index element={<Profile />} />
          <Route path='orders' element={<ProfileOrders />} />
          <Route
            path='orders/:id'
            element={
              <Modal title={'2'} onClose={() => {}}>
                <OrderInfo />
              </Modal>
            }
          />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
