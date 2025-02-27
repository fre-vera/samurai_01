import { React } from 'react';
import classes from './Dialogs.module.scss';
import { DialogItem } from './DialogItem';
import { Message } from './Message';
import { sendMessageCreator, updateNewMessageBodyCreator } from '../redux/dialogs-reducer';

export const Dialogs = (props) => {
  
  const dialogsElements = props.state.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} avatar={dialog.avatar} />);
  const messageElements = props.state.messages.map(message => <Message message={message.message} id={message.id} />);
  const newMessageBody = props.state.newMessageBody;
  
  const onSendMessageClick = () => {
    props.dispatch(sendMessageCreator())
  };

  const onNewMessageChange = (event) => {
    let body = event.target.value;
    props.dispatch(updateNewMessageBodyCreator(body))
  };

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItem}>
        { dialogsElements }
       </div>
      <div className={classes.message}>
        <div>{messageElements}</div>
        <div>
          <textarea
            value={newMessageBody}
            onChange={onNewMessageChange}
            placeholder="Введите ваше сообщение...">
          </textarea>
        </div>
        <div>
          <button onClick={onSendMessageClick}>Add message</button>
        </div>
      </div> 
    </div>
  );
};
