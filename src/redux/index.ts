import { configureStore } from '@reduxjs/toolkit';
import mergeReducer from './merge';

export default configureStore({
  reducer: {
    merge: mergeReducer,
  },
});
