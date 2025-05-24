import classes from './Dialogs.module.scss';
import { DialogItem } from './DialogItem';
import { Message } from './Message';

export const Dialogs = (props) => {

  const dialogsElements = props.dialogsPage.dialogs.map((dialog) => <DialogItem name={dialog.name} id={dialog.id} avatar={dialog.avatar} />);
  const messageElements = props.dialogsPage.messages.map((message) => <Message message={message.message} id={message.id} />);

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItem}>
        { dialogsElements }
      </div>
      <div className={classes.message}>
        <div>{messageElements}</div>
        <div>
          <textarea
            value={props.dialogsPage.newMessageBody}
            onChange={props.onNewMessageChange}
            placeholder="Введите ваше сообщение...">
          </textarea>
        </div>
        <div>
          <button onClick={props.onSendMessageClick}>Add message</button>
        </div>
      </div>
    </div>
  );
};
