import classes from './MyPosts.module.scss';
import { Post } from './Post';
import { TextareaForm } from '../../common/TextareaForm';

export const MyPosts = (props) => {

  const postsElements = props.profilePage.posts.map((post) => <Post message={post.message} likesCount={post.likesCount}/>);

  return (
    <div>
      <div className={classes.postsBlock}>
        <h3>My posts</h3>
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
};
