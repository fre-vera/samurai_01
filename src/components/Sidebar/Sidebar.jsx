import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import classes from './Sidebar.module.scss';
import { Navbar } from './Navbar';
import { FriendsList } from './FriendsList';
import { getFriendsThunk } from '../redux/friends-reducer';

export const Sidebar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriendsThunk());
  }, [dispatch]);

  return (
    <aside className={classes.sidebar}>
      <Navbar />
      <FriendsList />
    </aside>
  );
};
