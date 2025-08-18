import React from 'react';
import { useMemo } from 'react';
import classes from './MyPosts.module.scss';
import { Post } from './Post';
import { TextareaForm } from '../../common/TextareaForm';

export const MyPosts = React.memo((props) => {
  const postsElements = useMemo(() => {
    return props.posts.map((post) => (
      <Post key={post.id} message={post.message} likesCount={post.likesCount}/>));
  }, [props.posts]);

  return (
    <div>
      <div className={classes.postsBlock}>
        <h3>Мои посты</h3>
      </div>
      <TextareaForm
        onSubmitHandler={props.addPost}
        name="newPostText"
        placeholder="Введите ваше сообщение..."
      />
      <div className={classes.posts}>
        { postsElements }
      </div>
    </div>
  );
});
