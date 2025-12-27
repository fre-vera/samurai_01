import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { dialogsSlice } from './dialogs-reducer';
import { profileSlice } from './profile-reducer';
import { friendsSlice } from './friends-reducer';
import { usersSlice } from './users-reducer';
import { authSlice } from './auth-reduser';
import { appSlice } from './app-reduser';
import { thunk } from 'redux-thunk';

export const reducer = combineReducers({
  profilePage: profileSlice.reducer,
  dialogsPage: dialogsSlice.reducer,
  friendsPage: friendsSlice.reducer,
  usersPage: usersSlice.reducer,
  auth: authSlice.reducer,
  app: appSlice.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
