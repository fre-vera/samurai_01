import React from 'react';
import classes from './Users.module.scss';
import userPhoto from '../assets/images/avatar.jpg';

export const Users = (props) => {
  
  const pages = Array.from({ length: props.pagesCount }, (_, i) => i + 1);
  let curPage = props.currentPage;
  let slicedPages;
  if (curPage - 3 < 0) {
    slicedPages = pages.slice(0, 5);
  } else {
    slicedPages = pages.slice(curPage - 3, curPage + 2);
  }

  return (
    <div className={classes.usersContainer}>
      <div className={classes.pagination}>
        {slicedPages.map((page) => (
          <span
            key={page}
            onClick={() => props.setCurrentPage(page)}
            className={`${classes.pageNumber} ${props.currentPage === page ? classes.active : ''}`}
          >
            {page}
          </span>
        ))}
      </div>
      {props.usersPage.users.map((user) => (
        <div key={user.id} className={classes.user}>
          <div className={classes.avatar}>
            <img src={user.photos.small != null ? user.photos.small : userPhoto} alt={user.name} />
          </div>
          <div className={classes.userInfo}>
            <div className={classes.name}>{user.name}</div>
            <div className={classes.status}>{user.status}</div>
          </div>
          {/* <div className={classes.location}>
            <div>{user.location.country}</div>
            <div>{user.location.city}</div>
          </div> */}
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