import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Preloader } from './Preloader';

export const PrivateRoute = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const initialized = useSelector((state) => state.app.initialized);

  if (!initialized) {
    return <Preloader />;
  }

  return isAuth ? children : <Navigate to="/login" />;
};
