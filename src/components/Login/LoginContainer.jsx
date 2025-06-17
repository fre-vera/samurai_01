import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/auth-reduser';
import { Login } from './Login';

export const LoginContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth.userId);

  const handleLogin = async (email, password, rememberMe, setError) => {
    try {
      await dispatch(login(email, password, rememberMe, setError));
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  }, [userId, navigate]);

  return <Login login={handleLogin} />;
};
