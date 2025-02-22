import { React, useRef } from "react";
import classes from './MyPosts.module.scss';
import { Post } from './Post';

export const MyPosts = (props) => {

  const postsElements = props.posts.map(post => <Post message={post.message} likesCount={post.likesCount}/>)
  const newPostElement = useRef();

  const addPost = () => {
    props.addPost();
  };

  const onPostChange = () => {
    const text = newPostElement.current.value;
    props.updateNewPostText(text);
  };

  return (
    <div>
      <div className={classes.postsBlock}>
        <h3>My posts</h3>
      </div>
        <div>
        <textarea 
          onChange={onPostChange}
          ref={newPostElement}
          value={props.newPostText}
        />
        </div>
        <div>
          <button onClick={addPost}>Add post</button>
        </div>
      <div>
        New post
      </div>
      <div className={classes.posts}>
        { postsElements }
      </div>
    </div>
  );
};
