import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Profile } from './Profile';
import { profileThunk } from '../redux/profile-reducer';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { Preloader } from '../Preloader';

export const ProfileContainer = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const profile = useSelector((state) => state.profilePage.profile);
  const isLoading = useSelector((state) => state.profilePage.isLoading);

  useEffect(() => {
    dispatch(profileThunk(userId));
  }, [dispatch, userId]);

  if (isLoading || !profile) {
    return <Preloader />;
  }
  return <Profile profile={profile} />;
};

export default withAuthRedirect(ProfileContainer);
