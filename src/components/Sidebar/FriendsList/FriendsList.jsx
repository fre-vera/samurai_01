import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classes from './FriendsList.module.scss';
import userPhoto from '../../assets/images/avatar.jpg';

export const FriendsList = () => {
  const friends = useSelector((state) => state.friendsPage.friends);
  const selectFollowedUsers = friends.filter((friend) => friend.followed === true);

  return (
    <div className={classes.friendsSection}>
      <h3>Friends</h3>
      <div className={classes.friendsList}>
        {selectFollowedUsers.map((friend) => (
          <div key={friend.id} className={classes.card}>
            <p className={classes.name}>{friend.name}</p>
            <NavLink to={`/profile/${friend.id}`}>
              <img
                src={friend.photos.small || userPhoto}
                alt={friend.name || 'User avatar'}
                className={classes.avatar}
              />
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};
