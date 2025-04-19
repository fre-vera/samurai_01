import React from 'react';
import classes from './ProfileInfo.module.scss';
import { Preloader } from '../../Preloader';

export const ProfileInfo = ({ profile }) => {
  if (!profile) {
    return <Preloader />;
  };



  return (
    <div>
      <div className={classes.imgBlock}>
        <img
          src='https://img.freepik.com/free-photo/beautiful-selective-focus-shot-crystal-ball-reflecting-breathtaking-sunset_181624-8579.jpg?t=st=1737911869~exp=1737915469~hmac=ffc18e2db699d9159c5e3a866fe50bad72b72db4d3aac0a95ed7735f4d128151&w=1380'
          alt='sunset'
        />
      </div>
      <div className={classes.descriptionBlock}>
        <img src={profile.photos.large ? profile.photos.large : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyQQie97-F6biacqWGhT8eoWImHp4xw3ROkw&s'} />
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
          ) : '' }
        </div>
      </div>
    </div>
  );
};
