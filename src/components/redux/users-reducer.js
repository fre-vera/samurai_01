const UNFOLLOW = 'UNFOLLOW';
const FOLLOW = 'FOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';

const initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
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
    case SET_USERS: 
      return {
        ...state,users: action.users
    }
    case SET_CURRENT_PAGE:
      return {
        ...state, currentPage: action.currentPage
    }
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state, totalUsersCount: action.setTotalUsersCount
    }
    default:
      return state;
  }
};

export const unFollowAC = (userId) => ({type: UNFOLLOW, userId});
export const followAC = (userId) => ({type: FOLLOW, userId});
export const setUsersAC = (users) => ({type: SET_USERS, users});
export const setCurrentPageAC = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCountAC = (setTotalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, setTotalUsersCount});
