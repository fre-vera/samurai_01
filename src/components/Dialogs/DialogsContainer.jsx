import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { sendMessageCreator, updateNewMessageBodyCreator } from '../redux/dialogs-reducer';
import { Dialogs } from './Dialogs';

export const DialogsContainer = () => {
  const dialogsPage = useSelector((store) => store.dialogsPage);
  const dispatch = useDispatch();

  const onSendMessageClick = () => {
    dispatch(sendMessageCreator());
  };

  const onNewMessageChange = (event) => {
    const body = event.target.value;
    dispatch(updateNewMessageBodyCreator(body));
  };

  return <Dialogs dialogsPage={dialogsPage} onSendMessageClick={onSendMessageClick} onNewMessageChange={onNewMessageChange} />;
};
