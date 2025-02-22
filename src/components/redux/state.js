let renderEntireTree = () => {};

export const state = {
  dialogsPage: {
    dialogs: [
      {id:1, name: 'Dimych', avatar:'https://png.pngtree.com/png-clipart/20240705/original/pngtree-web-programmer-avatar-png-image_15495273.png'},
      {id:2, name: 'Andrey', avatar:'https://png.pngtree.com/png-clipart/20240705/original/pngtree-web-programmer-avatar-png-image_15495273.png'},
      {id:3, name: 'Sveta', avatar:'https://pokcer.ru/wp-content/uploads/2014/01/gravatar.webp'},
      {id:4, name: 'Sasha', avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE6MJGf5aOBXXbTBPdhJjQPWatzY-i7EYObg&s'},
      {id:5, name: 'Victor', avatar:'https://pokcer.ru/wp-content/uploads/2014/01/gravatar.webp'},
      {id:6, name: 'Valera', avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE6MJGf5aOBXXbTBPdhJjQPWatzY-i7EYObg&s'},
    ],
    messages: [
      {id:1, message: 'Hi'},
      {id:2,  message: 'How is your it-kamasutra'},
      {id:3,  message: 'Yo'},
    ],
  },
  profilePage: {
    posts: [
      {id:1, message: 'Hi, how are you', likesCount: 15},
      {id:2,  message: 'My first post', likesCount: 20},
    ],
    newPostText: 'it-kamasutra.com'
  },
  sidebar: [
      {id:1, name: 'Andrey', img:'https://png.pngtree.com/png-clipart/20240705/original/pngtree-web-programmer-avatar-png-image_15495273.png'},
      {id:2, name: 'Sasha', img:'https://pokcer.ru/wp-content/uploads/2014/01/gravatar.webp'},
      {id:3, name: 'Sveta', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE6MJGf5aOBXXbTBPdhJjQPWatzY-i7EYObg&s'},
    ]
};

export const addPost = () => {
  const newPost = {
    id: state.profilePage.posts.length + 1,
    message: state.profilePage.newPostText,
    likesCount: 0,
  };
  state.profilePage.posts = [...state.profilePage.posts, newPost];
  state.profilePage.newPostText = '';
  renderEntireTree(state);
};

export const updateNewPostText = (newText) => {
  state.profilePage.newPostText = newText;
  renderEntireTree(state);
};

export const subscribe = (observer) => {
  renderEntireTree = observer;
}; 
