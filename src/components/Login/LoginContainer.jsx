import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/auth-reduser';
import { useEffect } from 'react';
import { Login } from './Login';

export const LoginContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (formData, setError) => {
    try {
      await dispatch(login(formData)).unwrap();
    } catch (error) {
      if (error && error.message) {
        setError('email', { type: 'manual', message: error.message });
      }
    }
  };

  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  }, [userId, navigate]);

  return <Login onLogin={handleLogin}/>;
};
