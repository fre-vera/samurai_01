import { React } from 'react';
import classes from './Post.module.scss';

export const Post = (props) => {
  return (
    <div>
      <div className={classes.item}>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkJigufyq00dk5hZq_acK0ix6Gq5LMj59Kg&s' alt='fox'></img>
        { props.message }
        <br></br>
        <span>like</span>{ props.likesCount }
      </div>
    </div>
  );
};
