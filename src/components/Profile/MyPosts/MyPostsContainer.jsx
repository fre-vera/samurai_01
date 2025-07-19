import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addPostActionCreator } from '../../redux/profile-reducer';
import { MyPosts } from '../MyPosts';

export const MyPostsContainer = () => {
  const posts = useSelector((state) => state.profilePage.posts);
  const dispatch = useDispatch();

  const addPost = useCallback((newPostText) => {
    dispatch(addPostActionCreator(newPostText));
  }, [dispatch]);

  return <MyPosts posts={posts} addPost={addPost}/>;
};
