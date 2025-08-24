import { combineReducers } from '@reduxjs/toolkit';

import ingredients from './slices/ingridientsSlice';
import user from './slices/userSlice';

const rootReducer = combineReducers({
  ingridients: ingredients,
  user: user
  // constructor: ,
  // order: ,
});

export default rootReducer;
