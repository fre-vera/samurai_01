import React from 'react';
import classes from './App.module.scss';
import { Header } from './components';
import { Navbar } from './components';
import { Profile } from './components';
import { Dialogs } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const App = (props) => {
  
    return (
    <BrowserRouter>
      <div className={classes.appWrapper}>
        <Header />
        <Navbar state={props.state.sidebar} />
        <div className={classes.appContent}>
      <Routes>
        <Route path='/profile' 
          element={<Profile state={props.state.profilePage} 
          addPost={props.addPost} 
          updateNewPostText={props.updateNewPostText} />} />
        <Route path='/dialogs' element={<Dialogs state={props.state.dialogsPage} />} />
        {/* <Route path='/news' element={<News />} />
        <Route path='/music' element={<Music />} />
        <Route path='/settings' element={<Settings />} /> */}
      </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
