import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const withAuthRedirect = (Component) => {
  return function WrappedComponent(props) {
    const isAuth = useSelector((store) => store.auth.isAuth);
    if (!isAuth) return <Navigate to={'/login'} />;
    return <Component {...props} />;
  };
};
