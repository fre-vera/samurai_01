import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Users } from './Users';
import { useEffect } from 'react';
import axios from 'axios';


export const UsersContainer = () => {
  const usersPage = useSelector((store) => store.usersPage);
  const dispatch = useDispatch();

  const pagesCount = Math.ceil(usersPage.totalUsersCount / usersPage.pageSize);

  const unFollowAC = (userId) => {
    dispatch({ type: 'UNFOLLOW', userId });
  };
  const follow = (userId) => {
    dispatch({ type: 'FOLLOW', userId });
  };
  const setUsersAC = (users) => {
    dispatch({ type: 'SET_USERS', users });
  };
  const setCurrentPageAC = (currentPage) => {
    dispatch({ type: 'SET_CURRENT_PAGE', currentPage });
  };
  const setTotalUsersCountAC = (setTotalUsersCount) => {
    dispatch({ type: 'SET_TOTAL_USERS_COUNT', setTotalUsersCount });
  };

  const onPageChanged = (pageNumber) => {
    setCurrentPageAC(pageNumber);
  };

  useEffect(() => {
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/users?page=${usersPage.currentPage}&count=${usersPage.pageSize}`)
      .then((response) => {
        setUsersAC(response.data.items);
        setTotalUsersCountAC(response.data.totalCount);
      })
      .catch((error) => console.error('Ошибка:', error));
  }, [dispatch, usersPage.currentPage, usersPage.pageSize]);


  return <Users
    usersPage={usersPage}
    unFollowAC={unFollowAC}
    followAC={follow}
    pagesCount={pagesCount}
    currentPage={usersPage.currentPage}
    setCurrentPage={onPageChanged}
  />;
};
