import React from 'react';
import classes from './App.module.scss';
import { Header } from './components';
import { Navbar } from './components';
import { ProfileContainer } from './components/Profile/ProfileContainer';
import { DialogsContainer } from './components/Dialogs/DialogsContainer';
import { UsersContainer } from './components/Users/UsersContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const App = (props) => {
  const sidebar = useSelector((state) => state.sidebar);

  return (
    <BrowserRouter>
      <div className={classes.appWrapper}>
        <Header />
        <Navbar state={sidebar} />
        <div className={classes.appContent}>
          <Routes>
            <Route path='/profile/:userId?' element={<ProfileContainer />} />
            <Route path='/dialogs' element={<DialogsContainer />} />
            <Route path='/users' element={<UsersContainer />} />
            {/* <Route path='/news' element={<News />} />
        <Route path='/music' element={<Music />} />
        <Route path='/settings' element={<Settings />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
