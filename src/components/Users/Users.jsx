import classes from './Users.module.scss';
import userPhoto from '../assets/images/avatar.jpg';
import { Preloader } from '../common/Preloader';
import { NavLink } from 'react-router-dom';
import { Pagination } from '../common/Pagination';

export const Users = ({
  usersPage,
  followUser,
  unFollowUser,
  pagesCount,
  currentPage,
  setCurrentPage,
  followingInProgress,
}) => {
  return (
    <div className={classes.usersContainer}>

      <Pagination
        totalPages={pagesCount}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <Preloader isActive={usersPage.isUsersLoading} />

      {usersPage.users.map((user) => (
        <div key={user.id} className={classes.user}>
          <div className={classes.avatar}>
            <NavLink to={`/profile/${user.id}`}>
              <img
                src={user.photos.small || userPhoto}
                alt={user.name || 'User avatar'}
              />
            </NavLink>
          </div>
          <div className={classes.userInfo}>
            <div className={classes.name}>{user.name}</div>
            <div className={classes.status}>{user.status}</div>
          </div>
          <div>
            {user.followed ? (
              <button
                disabled={followingInProgress.includes(user.id)}
                onClick={() => unFollowUser(user.id)}
                className={`${classes.button} ${classes.unfollow}`}
              >
                Unfollow
              </button>
            ) : (
              <button
                disabled={followingInProgress.includes(user.id)}
                onClick={() => followUser(user.id)}
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
