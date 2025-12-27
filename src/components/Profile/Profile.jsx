import { MyPostsContainer } from './MyPosts/MyPostsContainer';
import { ProfileInfo } from './ProfileInfo';

export const Profile = (props) => {
  return (
    <div>
      <ProfileInfo
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        isOwner={props.isOwner}
        savePhoto={props.savePhoto}
        isFollowed={props.isFollowed}
        onFollow={props.onFollow}
        onUnfollow={props.onUnfollow}
        followingInProgress={props.followingInProgress}
        userId={props.userId}
      />
      <MyPostsContainer />
    </div>
  );
};
