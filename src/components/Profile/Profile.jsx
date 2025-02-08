import { React } from "react";
import { MyPosts } from "./MyPosts";
import { ProfileInfo } from "./ProfileInfo";

export const Profile = (props) => {

  return (
    <div>
      <ProfileInfo />
      <MyPosts posts={props.posts}/>
    </div>
  );
};
