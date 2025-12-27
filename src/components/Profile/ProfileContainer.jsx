import { useEffect, useCallback } from 'react';
import { Profile } from './Profile';
import { Preloader } from '../../components/common/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getStatus } from '../redux/profile-reducer';
import { updateStatus } from '../redux/profile-reducer';
import { profileThunk } from '../redux/profile-reducer';
import { updatePhoto } from '../redux/profile-reducer';
import { followUserThunk } from '../redux/users-reducer';
import { unFollowUserThunk } from '../redux/users-reducer';
import { getUsersThunkCreator } from '../redux/users-reducer';

export const ProfileContainer = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const profile = useSelector((state) => state.profilePage.profile);
  const isLoading = useSelector((state) => state.profilePage.isLoading);
  const status = useSelector((state) => state.profilePage.status);
  const authId = useSelector((state) => state.auth.userId);
  const users = useSelector((state) => state.usersPage.users);
  const followingInProgress = useSelector((state) => state.usersPage.followingInProgress);
  const isOwner = !userId || Number(userId) === authId;
  const currentUser = users.find((user) => user.id === Number(userId));
  const isFollowed = currentUser ? currentUser.followed : false;

  useEffect(() => {
    if (!userId) return;
    const userExists = users.some(
      (user) => user.id === Number(userId),
    );
    if (!userExists) {
      dispatch(getUsersThunkCreator({ currentPage: 1, pageSize: 100 }));
    }
  }, [dispatch, userId, users]);

  useEffect(() => {
    if (!userId) return;
    dispatch(profileThunk(userId));
    dispatch(getStatus(userId));
  }, [dispatch, userId]);

  const onUpdateStatus = useCallback(
    (status) => dispatch(updateStatus(status)),
    [dispatch],
  );

  const onSavePhoto = useCallback(
    (photo) => dispatch(updatePhoto(photo)),
    [dispatch],
  );

  const onFollow = useCallback(
    () => dispatch(followUserThunk(Number(userId))),
    [dispatch, userId],
  );

  const onUnfollow = useCallback(
    () => dispatch(unFollowUserThunk(Number(userId))),
    [dispatch, userId],
  );

  if (isLoading) return <Preloader />;
  if (!profile) return <div>Профиль не найден</div>;

  return (
    <Profile
      profile={profile}
      status={status}
      updateStatus={onUpdateStatus}
      savePhoto={onSavePhoto}
      isOwner={isOwner}
      isFollowed={isFollowed}
      onFollow={onFollow}
      onUnfollow={onUnfollow}
      followingInProgress={followingInProgress}
      userId={Number(userId)}
    />
  );
};
