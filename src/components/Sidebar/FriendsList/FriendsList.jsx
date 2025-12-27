import { useSelector } from 'react-redux';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Pagination } from '../../common/Pagination';
import classes from './FriendsList.module.scss';
import userPhoto from '../../assets/images/avatar.jpg';

export const FriendsList = () => {
  const friends = useSelector((state) => state.friendsPage.friends);
  const selectFollowedUsers = friends.filter((friend) => friend.followed);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const totalPages = Math.ceil(selectFollowedUsers.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentFriends = selectFollowedUsers.slice(startIndex, startIndex + pageSize);

  return (
    <div className={classes.friendsSection}>
      <h3>Friends</h3>
      {currentFriends.length > 0 ? (
        <>
          <div className={classes.friendsList}>
            {currentFriends.map((friend) => (
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
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      ) : (
        <p>Вы пока ни на кого не подписаны.</p>
      )}
    </div>
  );
};
