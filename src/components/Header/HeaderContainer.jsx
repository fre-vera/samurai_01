import React from 'react';
import { headerApi } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { setAuthUserData } from '../redux/auth-reduser';

export const HeaderContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, login } = useSelector((state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  }));

  useEffect(() => {
    headerApi.getAuth()
      .then((data) => {
        if (data.resultCode === 0) {
          const { id, email, login } = data.data;
          dispatch(setAuthUserData(id, email, login));
        }
      })
      .catch((error) => {
        console.error('Ошибка при получении данных авторизации:', error);
      });
  }, [dispatch]);

  const handleLogoClick = () => {
    navigate('/profile');
  };

  return <Header isAuth={isAuth} login={login} onLogoClick={handleLogoClick} />;
};
