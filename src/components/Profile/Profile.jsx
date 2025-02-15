import { React } from "react";
import { MyPosts } from "./MyPosts";
import { ProfileInfo } from "./ProfileInfo";

export const Profile = (props) => {
  console.log(props.state.posts);
  return (
    <div>
      <ProfileInfo />
      <MyPosts posts={props.state.posts} />
    </div>
  );
};
