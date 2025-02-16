import { React, useRef } from "react";
import classes from './Dialogs.module.scss';
import { DialogItem } from './DialogItem';
import { Message } from './Message';

export const Dialogs = (props) => {
  
  const dialogsElements = props.state.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} avatar={dialog.avatar} />);
  const messageElements = props.state.messages.map(message => <Message message={message.message} id={message.id} />);
  const newMessegeElement = useRef();
  const addMessage = () => {
    const text = newMessegeElement.current.value;
    alert(text);
  };

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItem}>
        { dialogsElements }
        <div>
          <textarea ref={newMessegeElement}></textarea>
        </div>
        <div>
          <button onClick={addMessage}>Add message</button>
        </div>
      </div>
      <div className={classes.message}>
        {messageElements}
      </div> 
    </div>
  );
};
