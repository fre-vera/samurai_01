import classes from './Dialogs.module.scss';
import { DialogItem } from './DialogItem';
import { Message } from './Message';
import { useForm } from 'react-hook-form';

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
        <AddMessegeForm onSendMessageClick={props.onSendMessageClick}/>
      </div>
    </div>
  );
};

export const AddMessegeForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    props.onSendMessageClick(data.message);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <textarea
          {...register('message', { required: true })}
          placeholder="Введите ваше сообщение...">
        </textarea>
        {errors.message && <span>Нельзя отправить пустое сообщение!</span>}
      </div>
      <div>
        <button>Отправить сообщение</button>
      </div>
    </form>
  );
};
