import { useEffect, useCallback } from 'react';
import { Profile } from './Profile';
import { Preloader } from '../Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getStatus, updateStatus, profileThunk } from '../redux/profile-reducer';
import { withAuthRedirect } from '../hoc/withAuthRedirect';

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
    dispatch(profileThunk(userId));
    dispatch(getStatus(userId));
  }, [dispatch, userId]);
  if (isLoading || !profile) {
    return <Preloader />;
  }

  return <Profile profile={profile} status={status} updateStatus={onUpdateStatus} />;
};

export default withAuthRedirect(ProfileContainer);
