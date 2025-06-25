import classes from './App.module.scss';
import { HeaderContainer } from './components/Header';
import { Navbar } from './components';
import { ProfileContainer } from './components/Profile/ProfileContainer';
import { DialogsContainer } from './components/Dialogs/DialogsContainer';
import { UsersContainer } from './components/Users/UsersContainer';
import { LoginContainer } from './components/Login/LoginContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeApp } from './components/redux/app-reduser';
import { Navigate } from 'react-router-dom';
import { PrivateRoute } from './components/common/PrivateRoute';

export const App = () => {
  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.sidebar);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const userId = useSelector((state) => state.auth.userId);


  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className={classes.appWrapper}>
        <HeaderContainer />
        <Navbar state={sidebar} />
        <div className={classes.appContent}>
          <Routes>
            <Route path='/profile/:userId' element={<PrivateRoute><ProfileContainer /></PrivateRoute>} />
            <Route path='/profile/' element={<PrivateRoute><ProfileContainer /></PrivateRoute>} />
            <Route path='/dialogs' element={<PrivateRoute><DialogsContainer /></PrivateRoute>} />
            <Route path='/users' element={<PrivateRoute><UsersContainer /></PrivateRoute>} />
            <Route
              path="/login" element={isAuth ? <Navigate to={`/profile/${userId}`} /> : <LoginContainer />}
            />
            {/* <Route path='/news' element={<News />} />
            <Route path='/music' element={<Music />} />
            <Route path='/settings' element={<Settings />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
