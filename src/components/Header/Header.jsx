import React from 'react';
import classes from './Header.module.scss';
import { NavLink } from 'react-router-dom';

export const Header = (props) => {
  return (
    <header className={classes.header}>
      <img
        src="https://i.pinimg.com/736x/5d/37/59/5d37593086b6b4e6aae2ad8f5b4659b3.jpg"
        alt="panda"
        onClick={props.onLogoClick}
        style={{ cursor: 'pointer' }}
      />
      <div className={classes.loginBlock}>
        { props.isAuth ? props.login
          : <NavLink to={'/login'}>Войти</NavLink>}
      </div>
    </header>
  );
};
