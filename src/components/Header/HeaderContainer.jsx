import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { headerApiThunk } from '../redux/auth-reduser';

export const HeaderContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const login = useSelector((state) => state.auth.login);


  useEffect(() => {
    dispatch(headerApiThunk());
  }, [dispatch]);

  const handleLogoClick = () => {
    navigate('/profile');
  };

  return <Header isAuth={isAuth} login={login} onLogoClick={handleLogoClick} />;
};
