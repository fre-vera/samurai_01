import React from 'react';
import classes from './Sidebar.module.scss';
import { Navbar } from './Navbar';
import { FriendsList } from './FriendsList';

export const Sidebar = () => {
  return (
    <aside className={classes.sidebar}>
      <Navbar />
      <FriendsList />
    </aside>
  );
};
