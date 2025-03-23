import React from "react";
import classes from './Users.module.scss';

export const Users = (props) => {
  return (
    <div className={classes.usersContainer}>
      {props.usersPage.users.map((user) => (
        <div key={user.id} className={classes.user}>
          <div className={classes.avatar}>
            <img src={user.photoUrl} alt={user.fullName} />
          </div>
          <div className={classes.userInfo}>
            <div className={classes.fullName}>{user.fullName}</div>
            <div className={classes.status}>{user.status}</div>
          </div>
          <div className={classes.location}>
            <div>{user.location.country}</div>
            <div>{user.location.city}</div>
          </div>
          <div>
            {user.followed ? (
              <button
                onClick={() => props.unFollowAC(user.id)}
                className={`${classes.button} ${classes.unfollow}`}
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => props.followAC(user.id)}
                className={`${classes.button} ${classes.follow}`}
              >
                Follow
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};