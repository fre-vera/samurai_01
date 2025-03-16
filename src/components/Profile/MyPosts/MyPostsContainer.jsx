import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addPostActionCreator } from '../../redux/profile-reducer';
import { updateNewPostTextActionCreator } from '../../redux/profile-reducer';
import { MyPosts } from '../MyPosts';

export const MyPostsContainer = () => {
  const profilePage = useSelector(store => store.profilePage);
  const dispatch = useDispatch();


   const addPost = () => {
    dispatch(addPostActionCreator());
  };

  const onPostChange = (event) => {
    let text = event.target.value;
    dispatch(updateNewPostTextActionCreator(text));
  };

  return <MyPosts profilePage={profilePage} addPost={addPost} onPostChange={onPostChange} />
};
