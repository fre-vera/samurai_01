import { React } from "react";
import { MyPosts } from "./MyPosts";
import { ProfileInfo } from "./ProfileInfo";

export const Profile = () => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts />
    </div>
  );
};
