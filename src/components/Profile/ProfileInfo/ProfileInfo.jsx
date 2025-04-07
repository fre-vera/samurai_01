import { React } from 'react';
import classes from './ProfileInfo.module.scss';

export const ProfileInfo = () => {
  return (
    <div>
      <div className={classes.imgBlock}>
        <img src="https://img.freepik.com/free-photo/beautiful-selective-focus-shot-crystal-ball-reflecting-breathtaking-sunset_181624-8579.jpg?t=st=1737911869~exp=1737915469~hmac=ffc18e2db699d9159c5e3a866fe50bad72b72db4d3aac0a95ed7735f4d128151&w=1380" alt="sunset" />
      </div>
      <div className={classes.descriptionBlock}>
        ava + description
      </div>
    </div>
  );
};
