import { getAuthUserData } from './auth-reduser';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  initialized: false,
};

// Thunks
export const initializeApp = createAsyncThunk(
  'app/initializeApp',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await dispatch(getAuthUserData());
      return true;
    } catch (error) {
      return rejectWithValue({
        message: 'Ошибка при получении данных авторизации',
        error: error.message,
      });
    }
  },
);

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.fulfilled, (state) => {
        state.initialized = true;
      })
      .addCase(initializeApp.rejected, (state) => {
        state.initialized = true;
      });
  },
},
);
