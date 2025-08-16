import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/auth-reduser';
import { useEffect } from 'react';
import { Login } from './Login';

export const LoginContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (email, password, rememberMe, setError) => {
    dispatch(login(email, password, rememberMe, setError));
  };

  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  }, [userId, navigate]);

  return <Login onLogin={handleLogin}/>;
};
