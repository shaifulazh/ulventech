import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import ulventechReducer from './ulventechSlice';

export const store = configureStore({
  reducer: {
    ulventech: ulventechReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
