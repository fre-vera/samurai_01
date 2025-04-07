import React from 'react';
import classes from '../Dialogs.module.scss';

export const Message = (props) => {
  const isLeft = props.id % 2 === 0;
  const messageClass = isLeft ? classes.messageLeft : classes.messageRight;
  const avatar = 'https://liveopencart.ru/image/data/products/coverreview.jpg';

  return (
    <div className={`${classes.message} ${messageClass}`}>
      <img src={avatar} alt='avatar' className={classes.avatar} />
      <div className={classes.messageText}>{props.message}</div>
    </div>
  );
};
