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
import {
  selectUsersPage,
  selectPageSize,
  selectTotalUsersCount,
  selectCurrentPage,
  selectFollowingInProgress,
} from '../redux/selectors/userSelectors';
import { Preloader } from '../common/Preloader';

export const UsersContainer = () => {
  const usersPage = useSelector(selectUsersPage);
  const totalUsersCount = useSelector(selectTotalUsersCount);
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);
  const followingInProgress = useSelector(selectFollowingInProgress);

  const dispatch = useDispatch();

  const pagesCount = Math.ceil(totalUsersCount / pageSize);

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPageAC(pageNumber));
    dispatch(setIsUsersLoadingAC(true));
    dispatch(getUsersThunkCreator(pageNumber, pageSize)); //вынос
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
    dispatch(getUsersThunkCreator(currentPage, pageSize));  //вынос
  }, [dispatch, currentPage, pageSize]);  //вынос

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
