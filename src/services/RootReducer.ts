import { combineReducers } from '@reduxjs/toolkit';
import ingredients from './slices/ingredientsSlice';
import user from './slices/userSlice';
import constructor from './slices/constructorSlice';
import order from './slices/orderSlice';
import feed from './slices/feedSlice';
import profileOrders from './slices/profileOrdersSlice';
import profile from './slices/profileSlice';

const rootReducer = combineReducers({
  ingredients: ingredients,
  user: user,
  constructor: constructor,
  order: order,
  feed: feed,
  profileOrders: profileOrders,
  profile: profile
});

export default rootReducer;
