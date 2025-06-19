const SEND_MESSAGE = 'SEND_MESSAGE';

const initialState = {
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

export const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {

    case SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, { id: state.messages.length + 1, message: action.newMessageBody }],
      };
    default:
      return state;
  }
};

export const sendMessageCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody });
