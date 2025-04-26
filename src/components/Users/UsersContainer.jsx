import { useSelector, useDispatch } from 'react-redux';
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

const API_KEY = 'a2915d57-61c6-4282-a06f-5e8aaaf4d142';
const BASE_URL = 'https://social-network.samuraijs.com/api/1.0';

export const UsersContainer = () => {
  const usersPage = useSelector((store) => store.usersPage);
  const dispatch = useDispatch();

  const pagesCount = Math.ceil(usersPage.totalUsersCount / usersPage.pageSize);

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPageAC(pageNumber));
    dispatch(setIsUsersLoadingAC(true));
    axios
      .get(`${BASE_URL}/users?page=${pageNumber}&count=${usersPage.pageSize}`, {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(setUsersAC(response.data.items));
        dispatch(setTotalUsersCountAC(response.data.totalCount));
      })
      .catch((error) => console.error('Ошибка загрузки пользователей:', error))
      .finally(() => dispatch(setIsUsersLoadingAC(false)));
  };

  const handleFollow = (userId) => {
    axios.post(`${BASE_URL}/follow/${userId}`, {}, {
      withCredentials: true,
      headers: {
        'API-KEY': API_KEY,
      },
    })
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(followAC(userId));
        }
      })
      .catch((error) => console.error('Ошибка при подписке:', error));
  };

  const handleUnfollow = (userId) => {
    axios.delete(`${BASE_URL}/follow/${userId}`, {
      withCredentials: true,
      headers: {
        'API-KEY': API_KEY,
      },
    })
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(unFollowAC(userId));
        }
      })
      .catch((error) => console.error('Ошибка при отписке:', error));
  };

  useEffect(() => {
    dispatch(setIsUsersLoadingAC(true));
    axios
      .get(`${BASE_URL}/users?page=${usersPage.currentPage}&count=${usersPage.pageSize}`, {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(setUsersAC(response.data.items));
        dispatch(setTotalUsersCountAC(response.data.totalCount));
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
