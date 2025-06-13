import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addPostActionCreator } from '../../redux/profile-reducer';
import { MyPosts } from '../MyPosts';

export const MyPostsContainer = () => {
  const profilePage = useSelector((store) => store.profilePage);
  const dispatch = useDispatch();


  const addPost = (newPostText) => {
    dispatch(addPostActionCreator(newPostText));
  };

  return <MyPosts profilePage={profilePage} addPost={addPost} />;
};
