import React from "react";
import classes from '../Dialogs.module.scss';

export const Message = (props) => {
  return (
    <div className={classes.dialog}>{props.message}</div> 
  );
};
