import classes from './ProfileInfo.module.scss';
import { ProfileStatus } from '../ProfileStatus';
import { Preloader } from '../../common/Preloader';

export const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto }) => {
  if (!profile) {
    return <Preloader />;
  };

  const DEFAULT_AVATAR = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyQQie97-F6biacqWGhT8eoWImHp4xw3ROkw&s';

  const onMainPhotoSelected = (event) => {
    if (event.target.files.length) {
      savePhoto(event.target.files[0]);
    }
  };

  return (
    <div className={classes.descriptionBlock}>
      <img
        src={profile.photos.large ? profile.photos.large : DEFAULT_AVATAR}
        alt='avatar'
      />
      {isOwner && <input type='file' onChange={onMainPhotoSelected}/>}
      <ProfileStatus status={status} updateStatus={updateStatus} />
      <div>{profile.aboutMe ? (
        <>
          <h3>Обо мне:</h3>
          <p>{profile.aboutMe}</p>
        </>
      ) : `Обо мне: \u{1F92B}`}</div>
      <div>
        <h3>Контакты:</h3>
        {Object.values(profile.contacts).some(Boolean) ? (
          Object.entries(profile.contacts).map(
            ([key, value]) => value && (
              <p key={key}>
                <strong>{key}:</strong>{' '}
                <a href={value} target='_blank'>
                  {value}
                </a>
              </p>
            ),
          )
        ) : (
          <p>Со мной невозможно связаться 😈</p>
        )}
      </div>
      <div>
        {profile.lookingForAJob && (
          <div>
            <strong>Статус поиска работы:</strong> {profile.lookingForAJobDescription}
          </div>
        )}
      </div>
      <div>
        {profile.fullName ? (
          <>
            <strong>Полное имя:</strong> {profile.fullName}
          </>
        ) : ''}
      </div>
    </div>
  );
};
