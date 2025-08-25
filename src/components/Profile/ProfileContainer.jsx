import { useEffect, useCallback } from 'react';
import { Profile } from './Profile';
import { Preloader } from '../../components/common/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getStatus, updateStatus, profileThunk } from '../redux/profile-reducer';

export const ProfileContainer = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const profile = useSelector((state) => state.profilePage.profile);
  const isLoading = useSelector((state) => state.profilePage.isLoading);
  const status = useSelector((state) => state.profilePage.status);

  const onUpdateStatus = useCallback(
    (status) => dispatch(updateStatus(status)),
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
    profile={profile}
    status={status}
    updateStatus={onUpdateStatus} />;
};
