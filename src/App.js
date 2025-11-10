import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classes from './App.module.scss';
import { HeaderContainer } from './components/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ProfileContainer } from './components/Profile/ProfileContainer';
import { LoginContainer } from './components/Login/LoginContainer';
import { initializeApp } from './components/redux/app-reduser';
import { PrivateRoute } from './components/common/PrivateRoute';
import { Preloader } from './components/common/Preloader';

const DialogsContainer = React.lazy(() =>
  import('./components/Dialogs/DialogsContainer').then((module) => ({ default: module.DialogsContainer })),
);
const UsersContainer = React.lazy(() =>
  import('./components/Users/UsersContainer').then((module) => ({ default: module.UsersContainer })),
);

export const App = () => {
  const dispatch = useDispatch();
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
        {/* Header сверху */}
        <HeaderContainer />

        {/* Основная область: sidebar слева + контент справа */}
        <div className={classes.mainArea}>
          {/* Sidebar */}
          <Sidebar />

          {/* Основной контент справа */}
          <div className={classes.appContent}>
            <Suspense fallback={<Preloader />}>
              <Routes>
                <Route
                  path="/profile/:userId"
                  element={
                    <PrivateRoute>
                      <ProfileContainer />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile/"
                  element={isAuth ? <Navigate to={`/profile/${userId}`} replace /> : <Navigate to="/login" replace />}
                />
                <Route path="/dialogs" element={<PrivateRoute><DialogsContainer /></PrivateRoute>} />
                <Route path="/users" element={<PrivateRoute><UsersContainer /></PrivateRoute>} />
                <Route
                  path="/login"
                  element={isAuth ? <Navigate to={`/profile/${userId}`} /> : <LoginContainer />}
                />
                {/* Можно добавить редирект на /profile по умолчанию */}
                <Route path="*" element={<Navigate to={isAuth ? `/profile/${userId}` : '/login'} replace />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};
