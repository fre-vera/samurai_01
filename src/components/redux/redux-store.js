import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { dialogsSlice } from './dialogs-reducer';
import { profileSlice } from './profile-reducer';
import { sidebarReducer } from './sidebar-reducer';
import { usersSlice } from './users-reducer';
import { authSlice } from './auth-reduser';
import { thunk } from 'redux-thunk';
import { appSlice } from './app-reduser';

export const reducer = combineReducers({
  profilePage: profileSlice.reducer,
  dialogsPage: dialogsSlice.reducer,
  sidebar: sidebarReducer,
  usersPage: usersSlice.reducer,
  auth: authSlice.reducer,
  app: appSlice.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
