import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Users } from './Users';
import { useEffect } from 'react';
import { setCurrentPageAC } from '../redux/users-reducer';
import { setIsUsersLoadingAC } from '../redux/users-reducer';
import { toggleFollowingProgress } from '../redux/users-reducer';
import { getUsersThunkCreator } from '../redux/users-reducer';
import { followUserThunk } from '../redux/users-reducer';
import { unFollowUserThunk } from '../redux/users-reducer';
import { changePageThunk } from '../redux/users-reducer';
import { selectUsersPage } from '../redux/selectors/userSelectors';
import { selectPageSize } from '../redux/selectors/userSelectors';
import { selectTotalUsersCount } from '../redux/selectors/userSelectors';
import { selectCurrentPage } from '../redux/selectors/userSelectors';

export const UsersContainer = () => {
  const usersPage = useSelector(selectUsersPage);
  const totalUsersCount = useSelector(selectTotalUsersCount);
  const pageSize = useSelector(selectPageSize);
  const currentPage = useSelector(selectCurrentPage);

  const dispatch = useDispatch();

  const pagesCount = Math.ceil(totalUsersCount / pageSize);

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPageAC(pageNumber));
    dispatch(getUsersThunkCreator(pageNumber, pageSize));
  };

  const handleFollow = (userId) => {
    dispatch(followUserThunk(userId));
  };

  const handleUnfollow = (userId) => {
    dispatch(unFollowUserThunk(userId));
  };

  useEffect(() => {
    dispatch(setIsUsersLoadingAC(true));
    dispatch(getUsersThunkCreator(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  return (
    <Users
      usersPage={usersPage}
      followUser={handleFollow}
      unFollowUser={handleUnfollow}
      pagesCount={pagesCount}
      currentPage={currentPage}
      setCurrentPage={handlePageChange}
      toggleFollowingProgress={usersPage.followingInProgress}
    />
  );
};
