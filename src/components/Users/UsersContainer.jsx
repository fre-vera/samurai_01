import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Users } from './Users';
import { useEffect } from 'react';
import axios from 'axios';
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

  const onPageChanged = (pageNumber) => {
    dispatch(setCurrentPageAC(pageNumber));
    // Выполняем запрос при смене страницы
    dispatch(setIsUsersLoadingAC(true));
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${usersPage.pageSize}`)
      .then((response) => {
        dispatch(setUsersAC(response.data.items));
        dispatch(setTotalUsersCountAC(response.data.totalCount));
      })
      .catch((error) => console.error('Ошибка:', error))
      .finally(() => dispatch(setIsUsersLoadingAC(false)));
  };

  useEffect(() => {
    dispatch(setIsUsersLoadingAC(true));
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/users?page=${usersPage.currentPage}&count=${usersPage.pageSize}`)
      .then((response) => {
        dispatch(setUsersAC(response.data.items));
        dispatch(setTotalUsersCountAC(response.data.totalCount));
      })
      .catch((error) => console.error('Ошибка:', error))
      .finally(() => dispatch(setIsUsersLoadingAC(false)));
  }, [dispatch, usersPage.currentPage, usersPage.pageSize]);

  return (
    <Users
      usersPage={usersPage}
      unFollowAC={(userId) => dispatch(unFollowAC(userId))}
      followAC={(userId) => dispatch(followAC(userId))}
      pagesCount={pagesCount}
      currentPage={usersPage.currentPage}
      setCurrentPage={onPageChanged}
    />
  );
};
