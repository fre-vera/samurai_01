import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { addPost, subscribe, state } from './components/redux/state';
import { updateNewPostText } from './components/redux/state';

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderEntireTree = (state) => {
  root.render(
  <React.StrictMode>
    <App state={state} addPost={addPost} updateNewPostText={updateNewPostText} />
  </React.StrictMode>
);
};

renderEntireTree(state);

subscribe(renderEntireTree);
