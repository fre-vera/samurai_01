import { authApi } from '../../api/api';

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } });

export const getAuthUserData = () => {
  return (dispatch) => {
    authApi.getAuth()
      .then((data) => {
        if (data.resultCode === 0) {
          const { id, email, login } = data.data;
          dispatch(setAuthUserData(id, email, login, true));
        }
      })
      .catch((error) => {
        console.error('Ошибка при получении данных авторизации:', error);
      });
  };
};

export const login = (email, password, rememberMe) => {
  return (dispatch) => {
    authApi.login(email, password, rememberMe)
      .then((data) => {
        if (data.resultCode === 0) {
          dispatch(getAuthUserData());
        }
      })
      .catch((error) => {
        console.error('Ошибка при получении данных авторизации:', error);
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    authApi.logout()
      .then((data) => {
        if (data.resultCode === 0) {
          dispatch(setAuthUserData(null, null, null, false));
        }
      })
      .catch((error) => {
        console.error('Ошибка при получении данных авторизации:', error);
      });
  };
};
