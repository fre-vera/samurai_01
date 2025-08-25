import classes from './Dialogs.module.scss';
import { DialogItem } from './DialogItem';
import { Message } from './Message';
import { TextareaForm } from '../common/TextareaForm';

export const Dialogs = (props) => {

  const dialogsElements = props.dialogsPage.dialogs.map((dialog) => <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} avatar={dialog.avatar} />);
  const messageElements = props.dialogsPage.messages.map((message) => <Message key={message.id} message={message.message} id={message.id} />);

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItem}>
        { dialogsElements }
      </div>
      <div className={classes.message}>
        <div>{messageElements}</div>
        <TextareaForm
          onSubmitHandler={props.onSendMessageClick}
          name="message"
          placeholder="Введите ваше сообщение..."
        />
      </div>
    </div>
  );
};
