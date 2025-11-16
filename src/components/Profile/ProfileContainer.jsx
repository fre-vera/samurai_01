import { useEffect, useCallback } from 'react';
import { Profile } from './Profile';
import { Preloader } from '../../components/common/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getStatus, updateStatus, profileThunk } from '../redux/profile-reducer';
import { updatePhoto } from '../redux/profile-reducer';

export const ProfileContainer = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const profile = useSelector((state) => state.profilePage.profile);
  const isLoading = useSelector((state) => state.profilePage.isLoading);
  const status = useSelector((state) => state.profilePage.status);
  const authId = useSelector((state) => state.auth.userId);

  const onUpdateStatus = useCallback(
    (status) => dispatch(updateStatus(status)),
    [dispatch],
  );
  const onSavePhoto = useCallback(
    (photo) => dispatch(updatePhoto(photo)),
    [dispatch],
  );

  useEffect(() => {
    if (!userId) return;
    dispatch(profileThunk(userId));
    dispatch(getStatus(userId));
  }, [dispatch, userId]);

  if (isLoading) return <Preloader />;
  if (!profile) return <div>Профиль не найден</div>;

  return <Profile
    savePhoto={onSavePhoto}
    isOwner={!userId || Number(userId) === authId}
    profile={profile}
    status={status}
    updateStatus={onUpdateStatus} />;
};
