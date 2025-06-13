import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { sendMessageCreator, updateNewMessageBodyCreator } from '../redux/dialogs-reducer';
import { Dialogs } from './Dialogs';
import { withAuthRedirect } from '../hoc/withAuthRedirect';

export const DialogsContainer = () => {
  const dialogsPage = useSelector((store) => store.dialogsPage);

  const dispatch = useDispatch();

  const onSendMessageClick = (message) => {
    dispatch(sendMessageCreator(message));
  };

  return <Dialogs dialogsPage={dialogsPage} onSendMessageClick={onSendMessageClick} />;
};

export default withAuthRedirect(DialogsContainer);
