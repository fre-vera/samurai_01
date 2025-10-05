import { authApi } from '../../api/api';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  isInitialized: false,
};

export const getAuthUserData = createAsyncThunk(
  'auth/getAuthUserData',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authApi.getAuth();
      if (data.resultCode === 0) {
        const { id, email, login } = data.data;
        return ({ userId: id, email, login, isAuth: true });
      };
    } catch (error) {
      return rejectWithValue({
        message: 'Ошибка при получении данных авторизации',
        error: error.message,
      });
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password, rememberMe }, { rejectWithValue, dispatch }) => {
    try {
      const data = await authApi.login(email, password, rememberMe);
      if (data.resultCode === 0) {
        const authData = await dispatch(getAuthUserData()).unwrap();
        return authData;
      } else {
        const message = data.messages.length > 0 ? data.messages[0] : 'Some error';
        return rejectWithValue({ message, resultCode: data.resultCode });
      }
    } catch (error) {
      return rejectWithValue({
        message: 'Ошибка при получении данных авторизации',
        error: error.message,
      });
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authApi.logout();
      if (data.resultCode === 0) {
        return {};
      }
    } catch (error) {
      return rejectWithValue({
        message: 'Ошибка при получении данных авторизации',
        error: error.message,
      });
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAuthUserData.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
        state.email = action.payload.email;
        state.login = action.payload.login;
        state.isAuth = action.payload.isAuth;
        state.isInitialized = true;
      })
      .addCase(getAuthUserData.rejected, (state) => {
        state.isAuth = false;
        state.isInitialized = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userId = action.payload.userId;
        state.email = action.payload.email;
        state.login = action.payload.login;
        state.isAuth = action.payload.isAuth;
        state.isInitialized = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.isInitialized = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userId = null;
        state.email = null;
        state.login = null;
        state.isAuth = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
