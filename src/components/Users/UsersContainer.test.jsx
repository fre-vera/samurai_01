import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getUsersThunkCreator } from '../redux/users-reducer';
import { setCurrentPageAC } from '../redux/users-reducer';
import { UsersContainer } from './UsersContainer';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn((selectorFn) => {
    if (selectorFn.name === 'selectUsersPage') return { followingInProgress: [] };
    if (selectorFn.name === 'selectTotalUsersCount') return 10;
    if (selectorFn.name === 'selectPageSize') return 10;
    if (selectorFn.name === 'selectCurrentPage') return 1;
  }),
  useDispatch: () => mockDispatch,
}));

jest.mock('../redux/users-reducer', () => ({
  setCurrentPageAC: jest.fn(),
  getUsersThunkCreator: jest.fn(),
}));

jest.mock('./Users', () => ({
  Users: jest.fn(() => null),
}));

test('dispatch thunk action get users', () => {
  const { setCurrentPageAC, getUsersThunkCreator } = require('../redux/users-reducer');

  setCurrentPageAC.mockImplementation((pageNumber) => ({
    type: 'SET_CURRENT_PAGE',
    payload: pageNumber,
  }));

  getUsersThunkCreator.mockImplementation(({ pageNumber, pageSize }) => ({
    type: 'GET_USERS',
    payload: { pageNumber, pageSize },
  }));

  render(<UsersContainer />);
  const usersProps = require('./Users').Users.mock.calls[0][0];
  usersProps.setCurrentPage(5);
  expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_CURRENT_PAGE', payload: 5 });
  expect(mockDispatch).toHaveBeenCalledWith({
    type: 'GET_USERS',
    payload: { pageNumber: 5, pageSize: 10 },
  });
});
