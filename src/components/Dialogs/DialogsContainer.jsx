import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { sendMessageCreator } from '../redux/dialogs-reducer';
import { Dialogs } from './Dialogs';

export const DialogsContainer = () => {
  const dialogsPage = useSelector((store) => store.dialogsPage);

  const dispatch = useDispatch();

  const onSendMessageClick = (message) => {
    dispatch(sendMessageCreator(message));
  };

  return <Dialogs dialogsPage={dialogsPage} onSendMessageClick={onSendMessageClick} />;
};
