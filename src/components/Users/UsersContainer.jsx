import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Users } from './Users';

export const UsersContainer = () => {
  const usersPage = useSelector(store => store.usersPage);
  const dispatch = useDispatch();

  const unFollowAC = (userId) => {
    dispatch({ type: 'UNFOLLOW', userId })
  };

  const follow = (userId) => {
    dispatch({ type: 'FOLLOW', userId })
  };

  const setUsersAC = (users) => {
    dispatch({ type: 'SET_USERS', users })
  };

return <Users usersPage={usersPage} unFollowAC={unFollowAC} followAC={follow} setUsersAC={setUsersAC} />
};
