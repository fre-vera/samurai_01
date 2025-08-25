import { getAuthUserData } from './auth-reduser';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  initialized: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initializedSuccess: (state) => {
      state.initialized = true;
    },
  },
},
);

// // Action creators
export const { initializedSuccess } = appSlice.actions;

// Thunks
export const initializeApp = () => async (dispatch) => {
  try {
    await dispatch(getAuthUserData());
  } catch (error) {
    console.error('Ошибка при получении данных авторизации:', error);
  } finally {
    dispatch(initializedSuccess());
  }
};
