import React from "react";
import classes from './Dialogs.module.scss';
import { DialogItem } from './DialogItem';
import { Message } from './Message';

export const Dialogs = (props) => {
  
  const dialogsElements = props.state.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} avatar={dialog.avatar} />);
  const messageElements = props.state.messages.map(message => <Message message={message.message} id={message.id} />);

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
