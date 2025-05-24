import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { profileApi } from '../../api/api';
import { Profile } from './Profile';
import { profileThunk } from '../redux/profile-reducer';

export const ProfileContainer = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const profile = useSelector((state) => state.profilePage.profile);

  useEffect(() => {
    dispatch(profileThunk(userId));
  }, [dispatch, userId]);

  return <Profile profile={profile}/>;
};
