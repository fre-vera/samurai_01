import { getAuthUserData } from './auth-reduser';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState = {
  initialized: false,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

// Action creators
export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });

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
