import { useSelector, useDispatch } from 'react-redux';
import { Users } from './Users';
import { usersAPI } from '../../api/api';
import { useEffect } from 'react';
import {
  unFollowAC,
  followAC,
  setUsersAC,
  setCurrentPageAC,
  setTotalUsersCountAC,
  setIsUsersLoadingAC,
} from '../redux/users-reducer';

export const UsersContainer = () => {
  const usersPage = useSelector((store) => store.usersPage);
  const dispatch = useDispatch();

  const pagesCount = Math.ceil(usersPage.totalUsersCount / usersPage.pageSize);

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPageAC(pageNumber));
    dispatch(setIsUsersLoadingAC(true));
    usersAPI.getUsers(pageNumber, usersPage.pageSize)
      .then((data) => {
        dispatch(setUsersAC(data.items));
        dispatch(setTotalUsersCountAC(data.totalCount));
      })
      .catch((error) => console.error('Ошибка загрузки пользователей:', error))
      .finally(() => dispatch(setIsUsersLoadingAC(false)));
  };

  const handleFollow = (userId) => {
    usersAPI.follow(userId)
      .then((data) => {
        if (data.resultCode === 0) {
          dispatch(followAC(userId));
        }
      })
      .catch((error) => console.error('Ошибка при подписке:', error));
  };

  const handleUnfollow = (userId) => {
    usersAPI.unfollow(userId)
      .then((data) => {
        if (data.resultCode === 0) {
          dispatch(unFollowAC(userId));
        }
      })
      .catch((error) => console.error('Ошибка при отписке:', error));
  };

  useEffect(() => {
    dispatch(setIsUsersLoadingAC(true));
    usersAPI.getUsers(usersPage.currentPage, usersPage.pageSize)
      .then((data) => {
        dispatch(setUsersAC(data.items));
        dispatch(setTotalUsersCountAC(data.totalCount));
      })
      .catch((error) => console.error('Ошибка загрузки пользователей:', error))
      .finally(() => dispatch(setIsUsersLoadingAC(false)));
  }, [dispatch, usersPage.currentPage, usersPage.pageSize]);

  return (
    <Users
      usersPage={usersPage}
      followUser={handleFollow}
      unFollowUser={handleUnfollow}
      pagesCount={pagesCount}
      currentPage={usersPage.currentPage}
      setCurrentPage={handlePageChange}
    />
  );
};
