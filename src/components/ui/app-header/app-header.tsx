import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({
  userName,
  isConstructorActive = false,
  isFeedActive = false,
  isProfileActive = false
}) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <Link
          to='/'
          className={`${styles.link} ${isConstructorActive ? styles.link_active : ''}`}
        >
          <BurgerIcon type={isConstructorActive ? 'secondary' : 'primary'} />
          <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
        </Link>
        <Link
          to='/feed'
          className={`${styles.link} ${isFeedActive ? styles.link_active : ''}`}
        >
          <ListIcon type={isFeedActive ? 'secondary' : 'primary'} />
          <p className='text text_type_main-default ml-2'>Лента заказов</p>
        </Link>
      </div>
      <div className={styles.logo}>
        <Link to='/'>
          <Logo className='' />
        </Link>
      </div>
      <div
        className={`${styles.link_position_last} ${styles.link} ${isProfileActive ? styles.link_active : ''}`}
      >
        <Link to='/profile' className={styles.link}>
          <ProfileIcon type={isProfileActive ? 'secondary' : 'primary'} />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </Link>
      </div>
    </nav>
  </header>
);
