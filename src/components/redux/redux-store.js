import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { dialogsReducer } from './dialogs-reducer';
import { profileReducer } from './profile-reducer';
import { sidebarReducer } from './sidebar-reducer';
import { usersReducer } from './users-reducer';
import { authReducer } from './auth-reduser';
import { thunk } from 'redux-thunk';

export const reducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
