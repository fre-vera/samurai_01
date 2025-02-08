import React from "react";
import classes from '../Dialogs.module.scss';
import { NavLink } from "react-router-dom";

export const DialogItem = (props) => {
  const path = `/dialogs/${props.id}`;

  return (
    <div className={classes.dialog}>
      <NavLink to={path} className={({ isActive }) => (isActive ? classes.active : "")}>
        {props.name}
      </NavLink>
    </div>
  );
};
