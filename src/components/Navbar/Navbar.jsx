import { useSelector } from 'react-redux';
import classes from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';

export const Navbar = (props) => {
  const userId = useSelector((state) => state.auth.userId);

  return (
    <nav className={classes.nav}>
      <div className={classes.item}>
        <NavLink to={userId ? `/profile/${userId}` : '/login'} className={({ isActive }) => (isActive ? classes.active : '')}>
          Profile
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/dialogs' className={({ isActive }) => (isActive ? classes.active : '')}>
          Messages
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/news' className={({ isActive }) => (isActive ? classes.active : '')}>
          News
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/music' className={({ isActive }) => (isActive ? classes.active : '')}>
          Music
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/settings' className={({ isActive }) => (isActive ? classes.active : '')}>
          Settings
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/users' className={({ isActive }) => (isActive ? classes.active : '')}>
          Users
        </NavLink>
      </div>
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
    </nav>
  );
};
