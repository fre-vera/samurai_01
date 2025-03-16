import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { dialogsReducer } from './dialogs-reducer';
import { profileReducer } from './profile-reducer';
import { sidebarReducer } from './sidebar-reducer';

export const reducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer
});

export const store = configureStore({
  reducer: reducer,
});
