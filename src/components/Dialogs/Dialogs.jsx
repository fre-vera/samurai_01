import React from "react";
import classes from './Dialogs.module.scss';
import { DialogItem } from './DialogItem';
import { Message } from './Message';

export const Dialogs = (props) => {
  const { dialogs, messages } = props;
  const dialogsElements = dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} />);
  const messageElements = messages.map(message => <Message message={message.message} />);

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
