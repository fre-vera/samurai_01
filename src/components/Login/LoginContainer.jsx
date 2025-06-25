import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
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
      if (userId) {
        navigate(`/profile/${userId}`);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return <Login login={handleLogin} />;
};
