import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { logout } from '../redux/auth-reduser';

export const HeaderContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, login } = useSelector((state) => state.auth);

  const handleLogoClick = () => {
    navigate('/profile/32286');
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  return <Header isAuth={isAuth} login={login} logout={handleLogout} onLogoClick={handleLogoClick} />;
};
