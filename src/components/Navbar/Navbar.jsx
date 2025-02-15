import { React } from "react";
import classes from './Navbar.module.scss';
import { NavLink } from "react-router-dom";

export const Navbar = (props) => {
  return (
   <nav className={classes.nav}>
    <div className={classes.item}>
      <NavLink to='/profile' className={({ isActive }) => (isActive ? classes.active : "")}>
        Profile
      </NavLink>
    </div>
    <div className={classes.item}>
    <NavLink to='/dialogs' className={({ isActive }) => (isActive ? classes.active : "")}>
      Messages
    </NavLink>
    </div>
    <div className={classes.item}>
    <NavLink to='/news' className={({ isActive }) => (isActive ? classes.active : "")}>
      News
    </NavLink>
    </div>
    <div className={classes.item}>
    <NavLink to='/music' className={({ isActive }) => (isActive ? classes.active : "")}>
      Music
    </NavLink>
    </div>
    <div className={classes.item}>
    <NavLink to='/settings' className={({ isActive }) => (isActive ? classes.active : "")}>
       Settings
    </NavLink>
    </div>
    <div className={classes.wrapper}>
      <h3>Friends</h3>
      <div className={classes.friendsList}>
        {props.state.map( friend => 
          <div className={classes.card}>
            <p className={classes.name}>{friend.name}</p>
            <img src={friend.img} alt={friend.name} className={classes.avatar} />
          </div>
        )}
      </div>
    </div>
   </nav>
  );
};
