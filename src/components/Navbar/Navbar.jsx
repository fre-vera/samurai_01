import { useSelector } from 'react-redux';
import classes from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';

export const Navbar = (props) => {
  const userId = useSelector((state) => state.auth.userId);

  const menuItems = [
    { path: userId ? `/profile/${userId}` : '/login', label: 'Profile' },
    { path: '/dialogs', label: 'Messages' },
    { path: '/news', label: 'News' },
    { path: '/music', label: 'Music' },
    { path: '/settings', label: 'Settings' },
    { path: '/users', label: 'Users' },
  ];

  return (
    <div>
      <nav className={classes.nav}>
        {menuItems.map(({ path, label }) => (
          <div key={label} className={classes.item}>
            <NavLink to={path} className={({ isActive }) => (isActive ? classes.active : '')}>
              {label}
            </NavLink>
          </div>
        ))}
      </nav>
      <aside className={classes.friendsSection}>
        <div className={classes.wrapper}>
          <h3>Friends</h3>
          <div className={classes.friendsList}>
            {props.state.map((friend) =>
              <div key={friend.id} className={classes.card}>
                <p className={classes.name}>{friend.name}</p>
                <img src={friend.img} alt={friend.name} className={classes.avatar} />
              </div>,
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};
