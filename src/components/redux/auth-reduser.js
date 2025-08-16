import { authApi } from '../../api/api';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_INITIALIZED = 'SET_INITIALIZED';

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  isInitialized: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case SET_INITIALIZED:
      return {
        ...state,
        isInitialized: action.payload,
      };
    default:
      return state;
  }
};

// Action creators
export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } });
export const setInitialized = (value) => ({ type: SET_INITIALIZED, payload: value });
// Thunks
export const getAuthUserData = () => (dispatch) => {
  return authApi.getAuth()
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
        dispatch(setAuthUserData(null, null, null, false));
      }
    } catch (error) {
      console.error('Ошибка при получении данных авторизации:', error);
    }
  };
};
