import { MyPostsContainer } from './MyPosts/MyPostsContainer';
import { ProfileInfo } from './ProfileInfo';
import { Navigate } from 'react-router';

export const Profile = (props) => {
  if (!props.isAuth) return <Navigate to={'/login'} />;

  return (
    <div>
      <ProfileInfo profile={props.profile} />
      <MyPostsContainer />
    </div>
  );
};
