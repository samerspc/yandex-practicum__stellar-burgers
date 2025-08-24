import { combineReducers } from '@reduxjs/toolkit';

import ingredients from './slices/ingridientsSlice';

const rootReducer = combineReducers({
  ingridients: ingredients
  // user: ,
  // constructor: ,
  // order: ,
});

export default rootReducer;
