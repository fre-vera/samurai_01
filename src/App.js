import React from 'react';
import classes from './App.module.scss';
import { Header } from './components';
import { Navbar } from './components';
import { Profile } from './components';
import { Dialogs } from './components';
import { BrowserRouter, Routes, Route } from 'react-router';

export const App = () => {
  return (
    <BrowserRouter>
      <div className={classes.appWrapper}>
        <Header />
        <Navbar />
        <div className={classes.appContent}>
      <Routes>
        <Route path='/profile' element={<Profile />} />
        <Route path='/dialogs' element={<Dialogs />} />
        {/* <Route path='/news' element={<News />} />
        <Route path='/music' element={<Music />} />
        <Route path='/settings' element={<Settings />} /> */}
      </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
