import { useSelector } from 'react-redux';
import classes from './FriendsList.module.scss';

export const FriendsList = () => {
  const friends = useSelector((state) => state.usersPage.users);
  const selectFollowedUsers = friends.filter((friend) => friend.followed === true);

  return (
    <div className={classes.friendsSection}>
      <h3>Friends</h3>
      <div className={classes.friendsList}>
        {selectFollowedUsers.map((friend) => (
          <div key={friend.id} className={classes.card}>
            <p className={classes.name}>{friend.name}</p>
            <img src={friend.img} alt={friend.name} className={classes.avatar} />
          </div>
        ))}
      </div>
    </div>
  );
};
