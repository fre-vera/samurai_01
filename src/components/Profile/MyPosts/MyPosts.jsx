import { React } from "react";
import classes from './MyPosts.module.scss';
import { Post } from './Post';

export const MyPosts = () => {
  const posts = [
    {id:1, message: 'Hi, how are you', likesCount: 15},
    {id:2,  message: 'My first post', likesCount: 20},
  ];

  const postsElements = posts.map(post => <Post message={post.message} likesCount={post.likesCount}/>)

  return (
    <div>
      <div className={classes.postsBlock}>
        <h3>My posts</h3>
      </div>
        <div>
          <textarea></textarea>
        </div>
        <div>
          <button>Add post</button>
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
