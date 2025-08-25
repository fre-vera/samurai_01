import { authApi } from '../../api/api';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  isInitialized: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUserData: (state, action) => {
      const { userId, email, login, isAuth } = action.payload;
      state.userId = userId;
      state.email = email;
      state.login = login;
      state.isAuth = isAuth;
    },
    setInitialized: (state, action) => {
      const { value } = action.payload;
      state.isInitialized = value;
    },
  },
});

// // Action creators
export const { setAuthUserData,  setisInitialized } = authSlice.actions;

// Thunks
export const getAuthUserData = () => (dispatch) => {
  return authApi.getAuth()
    .then((data) => {
      if (data.resultCode === 0) {
        const { id, email, login } = data.data;
        dispatch(setAuthUserData({ userId: id, email, login, isAuth: true }));
      }
    })
    .catch((error) => {
      console.error('Ошибка при получении данных авторизации:', error);
    });
};

export const login = (email, password, rememberMe, setError) => {
  return async (dispatch, getState) => {
    try {
      const data = await authApi.login(email, password, rememberMe);
      if (data.resultCode === 0) {
        await dispatch(getAuthUserData());
        const userId = getState().auth.userId;
        return userId;
      } else {
        const message = data.messages.length > 0 ? data.messages[0] : 'Some error';
        setError('email', { type: 'manual', message });
      }
    } catch (error) {
      console.error('Ошибка при получении данных авторизации:', error);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      const data = await authApi.logout();
      if (data.resultCode === 0) {
        dispatch(setAuthUserData({ userId: null, email: null, login: null, isAuth: false }));
      }
    } catch (error) {
      console.error('Ошибка при получении данных авторизации:', error);
    }
  };
};
