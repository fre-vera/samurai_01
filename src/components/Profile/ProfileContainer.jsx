import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Profile } from './Profile';
import { profileThunk } from '../redux/profile-reducer';

export const ProfileContainer = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const profile = useSelector((state) => state.profilePage.profile);
  const isAuth = useSelector((store) => store.auth.isAuth);

  useEffect(() => {
    dispatch(profileThunk(userId));
  }, [dispatch, userId]);

  return <Profile profile={profile} isAuth={isAuth} />;
};
