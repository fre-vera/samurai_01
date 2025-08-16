import { dialogsReducer } from './dialogs-reducer';
import { sendMessageCreator } from './dialogs-reducer';

describe('dialogsReducer', () => {
  let state;

  const newMessage = 'Vera';

  beforeEach(() => {
    state = {
      dialogs: [
        { id: 1, name: 'Dimych', avatar: 'https://png.pngtree.com/png-clipart/20240705/original/pngtree-web-programmer-avatar-png-image_15495273.png' },
        { id: 2, name: 'Andrey', avatar: 'https://png.pngtree.com/png-clipart/20240705/original/pngtree-web-programmer-avatar-png-image_15495273.png' },
        { id: 3, name: 'Sveta', avatar: 'https://pokcer.ru/wp-content/uploads/2014/01/gravatar.webp' },
        { id: 4, name: 'Sasha', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE6MJGf5aOBXXbTBPdhJjQPWatzY-i7EYObg&s' },
        { id: 5, name: 'Victor', avatar: 'https://pokcer.ru/wp-content/uploads/2014/01/gravatar.webp' },
        { id: 6, name: 'Valera', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE6MJGf5aOBXXbTBPdhJjQPWatzY-i7EYObg&s' },
      ],
      messages: [
        { id: 1, message: 'Hi' },
        { id: 2,  message: 'How is your it-kamasutra' },
        { id: 3,  message: 'Yo' },
      ],
    };
  });

  it('should add new message to messages array in dialogsReducer', () => {
  //1. test data
    const action = sendMessageCreator(newMessage);
    //2.action
    const newState = dialogsReducer(state, action);
    //3.expectation
    expect(newState.messages[newState.messages.length - 1]).toEqual({ 'id': 4, 'message': 'Vera' });
    expect(newState.messages.length).toBe(4);
  });
});
