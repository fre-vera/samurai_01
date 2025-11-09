import { useEffect } from 'react';
import { Suspense } from 'react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import classes from './App.module.scss';
import { HeaderContainer } from './components/Header';
import { Navbar } from './components';
import { ProfileContainer } from './components/Profile/ProfileContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer').then((module) => ({ default: module.DialogsContainer })));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer').then((module) => ({ default: module.UsersContainer })));
import { LoginContainer } from './components/Login/LoginContainer';
import { initializeApp } from './components/redux/app-reduser';
import { PrivateRoute } from './components/common/PrivateRoute';
import { Preloader } from './components/common/Preloader';

export const App = () => {
  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.sidebar);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  if (!isAuth && window.location.pathname === '/profile') {
    return <Navigate to="/login" replace />;
  }

  return (
    <BrowserRouter>
      <div className={classes.appWrapper}>
        <HeaderContainer />
        <Navbar state={sidebar} />
        <div className={classes.appContent}>
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route path='/profile/:userId' element={<PrivateRoute><ProfileContainer /></PrivateRoute>} />
              <Route path='/profile/' element={isAuth ? <Navigate to={`/profile/${userId}`} replace /> : <Navigate to="/login" replace />} />
              <Route path='/dialogs' element={<PrivateRoute><DialogsContainer /></PrivateRoute>} />
              <Route path='/users' element={<PrivateRoute><UsersContainer /></PrivateRoute>} />
              <Route
                path="/login" element={isAuth ? <Navigate to={`/profile/${userId}`} /> : <LoginContainer />}
              />
              {/* <Route path='/news' element={<News />} />
            <Route path='/music' element={<Music />} />
            <Route path='/settings' element={<Settings />} /> */}
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
};
