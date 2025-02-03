import React from "react";
import classes from './Dialogs.module.scss';
import { NavLink } from "react-router-dom";

export const DialogItem = (props) => {
  const path = `${/dialogs/}${props.id}`;

  return (
    <div className={classes.dialog}>
      <NavLink to={path} className={({ isActive }) => (isActive ? classes.active : "")}>
        {props.name}
      </NavLink>
    </div>
  );
};

export const Message = (props) => {
  return (
    <div className={classes.dialog}>{props.message}</div> 
  );
};

const dialogs = [
  {id:1, name: 'Dimych'},
  {id:2, name: 'Andrey'},
  {id:3, name: 'Sveta'},
  {id:4, name: 'Sasha'},
  {id:5, name: 'Victor'},
  {id:6, name: 'Valera'},
];

const messages = [
  {id:1, message: 'Hi'},
  {id:2,  message: 'How is your it-kamasutra'},
  {id:3,  message: 'Yo'},
];

const dialogsElements = dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} />);
const messageElements = messages.map(message => <Message message={message.message} />);

export const Dialogs = (props) => {
  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItem}>
        { dialogsElements }
      </div>
      <div className={classes.message}>
        {messageElements}
      </div> 
    </div>
  );
};
