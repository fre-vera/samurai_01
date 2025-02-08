import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';

const dialogs = [
  {id:1, name: 'Dimych'},
  {id:2, name: 'Andrey'},
  {id:3, name: 'Sveta'},
  {id:4, name: 'Sasha'},
  {id:5, name: 'Victor'},
  {id:6, name: 'Valera'},
];

export const messages = [
  {id:1, message: 'Hi'},
  {id:2,  message: 'How is your it-kamasutra'},
  {id:3,  message: 'Yo'},
];

const posts = [
  {id:1, message: 'Hi, how are you', likesCount: 15},
  {id:2,  message: 'My first post', likesCount: 20},
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App messages={messages} dialogs={dialogs} posts={posts} />
  </React.StrictMode>
);
