import { authReducer } from './auth-reduser';
import { setAuthUserData } from './auth-reduser';

const userId = 123;
const email = 'test@mail.ru';
const login = 'user';
const isAuth = true;

const state = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
};

it('should set user data correctly in authReducer', () => {
  //1. test data
  const action = setAuthUserData(userId, email, login, isAuth);
  //2.action
  const newState = authReducer(state, action);
  //3.expectation
  expect(newState.userId).toBe(123);
  expect(newState.email).toBe('test@mail.ru');
  expect(newState.login).toBe('user');
  expect(newState.isAuth).toBe(true);
});
