import classes from './MyPosts.module.scss';
import { Post } from './Post';
import { useForm } from 'react-hook-form';

export const MyPosts = (props) => {

  const postsElements = props.profilePage.posts.map((post) => <Post message={post.message} likesCount={post.likesCount}/>);

  return (
    <div>
      <div className={classes.postsBlock}>
        <h3>My posts</h3>
      </div>
      <AddNewPostForm addPost={props.addPost} />
      <div>
        New post
      </div>
      <div className={classes.posts}>
        { postsElements }
      </div>
    </div>
  );
};

export const AddNewPostForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    props.addPost(data.newPostText);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <textarea
          {...register('newPostText', { required: true })}
          placeholder="Введите ваше сообщение...">
        </textarea>
        {errors.newPostText && <span>Нельзя отправить пустое сообщение!</span>}
      </div>
      <div>
        <button>Отправить сообщение</button>
      </div>
    </form>
  );
};
