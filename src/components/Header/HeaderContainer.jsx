import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { getAuthUserData } from '../redux/auth-reduser';
import { logout } from '../redux/auth-reduser';

export const HeaderContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, login, userId } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAuthUserData());
  }, [dispatch]);

  useEffect(() => {
    if (!userId && !isAuth) {
      navigate('/login');
    }
  }, [userId, navigate]);

  const handleLogoClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return <Header isAuth={isAuth} login={login} logout={handleLogout} onLogoClick={handleLogoClick} />;
};
