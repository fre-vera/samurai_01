import React from 'react';
import classes from './App.module.scss';
import { Header } from './components';
import { Navbar } from './components';
import { Profile } from './components';
import { DialogsContainer } from './components/Dialogs/DialogsContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const App = (props) => {
  const sidebar = useSelector(state => state.sidebar);

    return (
    <BrowserRouter>
      <div className={classes.appWrapper}>
        <Header />
        <Navbar state={sidebar} />
        <div className={classes.appContent}>
      <Routes>
        <Route path='/profile' element={<Profile />} />
        <Route path='/dialogs' element={<DialogsContainer />} />
        {/* <Route path='/news' element={<News />} />
        <Route path='/music' element={<Music />} />
        <Route path='/settings' element={<Settings />} /> */}
      </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
