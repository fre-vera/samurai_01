import { MyPostsContainer } from './MyPosts/MyPostsContainer';
import { ProfileInfo } from './ProfileInfo';

export const Profile = (props) => {
  return (
    <div>
      <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus} />
      <MyPostsContainer />
    </div>
  );
};
