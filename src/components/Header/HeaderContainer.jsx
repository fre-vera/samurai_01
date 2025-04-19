import React from 'react';
import axios from 'axios';
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
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.resultCode === 0) {
          const { id, email, login } = response.data.data;
          dispatch(setAuthUserData(id, email, login));
        }
      });
  }, [dispatch]);

  const handleLogoClick = () => {
    navigate('/profile');
  };

  return <Header isAuth={isAuth} login={login} onLogoClick={handleLogoClick} />;
};
