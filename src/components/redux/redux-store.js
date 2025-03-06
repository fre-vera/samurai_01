import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { dialogsReducer } from './dialogs-reducer';
import { profileReducer } from './profile-reducer';
import { sidebarReducer } from './sidebar-reducer';

const reducer = combineReducers({
  profilePage: profileReducer,
  dialogPage: dialogsReducer,
  sidebar: sidebarReducer
});

export const store = configureStore({
  reducer: reducer,
});
