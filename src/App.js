import React from 'react';
import classes from './App.module.scss';
import { HeaderContainer } from './components/Header';
import { Navbar } from './components';
import { ProfileContainer } from './components/Profile/ProfileContainer';
import { DialogsContainer } from './components/Dialogs/DialogsContainer';
import { UsersContainer } from './components/Users/UsersContainer';
import { Login } from './components/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const App = (props) => {
  const sidebar = useSelector((state) => state.sidebar);

  return (
    <BrowserRouter>
      <div className={classes.appWrapper}>
        <HeaderContainer />
        <Navbar state={sidebar} />
        <div className={classes.appContent}>
          <Routes>
            <Route path='/profile/:userId' element={<ProfileContainer />} />
            <Route path='/dialogs' element={<DialogsContainer />} />
            <Route path='/users' element={<UsersContainer />} />
            <Route path='/login' element={<Login />} />
            {/* <Route path='/news' element={<News />} />
        <Route path='/music' element={<Music />} />
        <Route path='/settings' element={<Settings />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
