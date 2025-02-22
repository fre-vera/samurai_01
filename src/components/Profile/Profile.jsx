import { React } from "react";
import { MyPosts } from "./MyPosts";
import { ProfileInfo } from "./ProfileInfo";

export const Profile = (props) => {
  console.log(props.state.posts);
  return (
    <div>
      <ProfileInfo />
      <MyPosts 
        posts={props.state.posts} 
        addPost={props.addPost} 
        updateNewPostText={props.updateNewPostText}
        newPostText={props.state.newPostText}
      />
    </div>
  );
};
