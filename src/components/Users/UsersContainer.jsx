import { useSelector, useDispatch } from 'react-redux';
import { Users } from './Users';
import { useEffect } from 'react';
import {
  setCurrentPageAC,
  setIsUsersLoadingAC,
  toggleFollowingProgress,
  getUsersThunkCreator,
  followUserThunk,
  unFollowUserThunk,
} from '../redux/users-reducer';

export const UsersContainer = () => {
  const usersPage = useSelector((store) => store.usersPage);
  const dispatch = useDispatch();

  const pagesCount = Math.ceil(usersPage.totalUsersCount / usersPage.pageSize);

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPageAC(pageNumber));
    dispatch(setIsUsersLoadingAC(true));
    dispatch(getUsersThunkCreator(pageNumber, usersPage.pageSize));
  };

  const handleFollow = (userId) => {
    dispatch(toggleFollowingProgress(true, userId));
    dispatch(followUserThunk(userId));
  };

  const handleUnfollow = (userId) => {
    dispatch(toggleFollowingProgress(true, userId));
    dispatch(unFollowUserThunk(userId));
  };

  useEffect(() => {
    dispatch(setIsUsersLoadingAC(true));
    dispatch(getUsersThunkCreator(usersPage.currentPage, usersPage.pageSize));
  }, [dispatch, usersPage.currentPage, usersPage.pageSize]);

  return (
    <Users
      usersPage={usersPage}
      followUser={handleFollow}
      unFollowUser={handleUnfollow}
      pagesCount={pagesCount}
      currentPage={usersPage.currentPage}
      setCurrentPage={handlePageChange}
      toggleFollowingProgress={usersPage.followingInProgress}
    />
  );
};
