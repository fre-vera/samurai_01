import { React } from 'react';
import { MyPostsContainer } from './MyPosts/MyPostsContainer';
import { ProfileInfo } from './ProfileInfo';

export const Profile = () => {

  return (
    <div>
      <ProfileInfo />
      <MyPostsContainer />
    </div>
  );
};
