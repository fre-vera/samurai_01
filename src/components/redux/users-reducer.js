const UNFOLLOW = 'UNFOLLOW';
const FOLLOW = 'FOLLOW';
const SET_USERS = 'SET_USERS';


const initialState = {
  users: [
    {id:1, followed: true, fullName: 'Dimych', photoUrl:'https://png.pngtree.com/png-clipart/20240705/original/pngtree-web-programmer-avatar-png-image_15495273.png', status: 'I love my city', location: {country: 'Russia', city: 'St.Peterburg'},},
    {id:2, followed: false, fullName: 'Andrey', photoUrl:'https://png.pngtree.com/png-clipart/20240705/original/pngtree-web-programmer-avatar-png-image_15495273.png', status: 'I love programming', location: {country: 'Germany', city: 'Berlin'},},
    {id:3, followed: true, fullName: 'Sveta', photoUrl:'https://pokcer.ru/wp-content/uploads/2014/01/gravatar.webp', status: 'I study react', location: {country: 'Belarus', city: 'Minsk'},},
    {id:4, followed: false, fullName: 'Sasha', photoUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE6MJGf5aOBXXbTBPdhJjQPWatzY-i7EYObg&s', status: 'The weather is bad outside', location: {country: 'Russia', city: 'Moscow'},},
  ]
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case UNFOLLOW:
      return { 
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return {...user, followed: false};
          }
          return user;
        })
      };
    case FOLLOW:
      return { 
        ...state,
        users: state.users.map(user => {
          if (user.id === action.userId) {
            return {...user, followed: true};
          }
          return user;
        })
      };
      case SET_USERS: {
        return { 
          ...state,users: [...action.users]
        };
      }
    default:
      return state;
  }
};

export const unFollowAC = (userId) => ({type: UNFOLLOW, userId});
export const followAC = (userId) => ({type: FOLLOW, userId});
export const setUsersAC = (users) => ({type: SET_USERS, users});
