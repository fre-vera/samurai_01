import { usersAPI } from '../../api/api';

const UNFOLLOW = 'UNFOLLOW';
const FOLLOW = 'FOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_IS_USERS_LOADING = 'SET_IS_USERS_LOADING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

const initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isUsersLoading: false,
  followingInProgress: [],
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: false };
          }
          return user;
        }),
      };
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    case SET_IS_USERS_LOADING:
      return {
        ...state,
        isUsersLoading: action.isUsersLoading,
      };
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    default:
      return state;
  }
};
// Action creators
export const unFollowAC = (userId) => ({ type: UNFOLLOW, userId });
export const followAC = (userId) => ({ type: FOLLOW, userId });
export const setUsersAC = (users) => ({ type: SET_USERS, users });
export const setCurrentPageAC = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
export const setTotalUsersCountAC = (totalUsersCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
});
export const setIsUsersLoadingAC = (isUsersLoading) => ({
  type: SET_IS_USERS_LOADING,
  isUsersLoading,
});
export const toggleFollowingProgress = (isFetching, userId) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

// Thunks
export const getUsersThunkCreator = (pageNumber, pageSize) => {
  return (dispatch) => {
    usersAPI.getUsers(pageNumber, pageSize)
      .then((data) => {
        dispatch(setUsersAC(data.items));
        dispatch(setTotalUsersCountAC(data.totalCount));
      })
      .catch((error) => console.error('Ошибка загрузки пользователей:', error))
      .finally(() => dispatch(setIsUsersLoadingAC(false)));
  };
};

export const followUserThunk = (userId) => {
  return (dispatch) => {
    usersAPI.follow(userId)
      .then((data) => {
        if (data.resultCode === 0) {
          dispatch(followAC(userId));
        }
      })
      .catch((error) => {
        console.error('Ошибка при подписке:', error);
      })
      .finally(() => {
        dispatch(toggleFollowingProgress(false, userId));
      });
  };
};

export const unFollowUserThunk = (userId) => {
  return (dispatch) => {
    usersAPI.unfollow(userId)
      .then((data) => {
        if (data.resultCode === 0) {
          dispatch(unFollowAC(userId));
        }
      })
      .catch((error) => {
        console.error('Ошибка при подписке:', error);
      })
      .finally(() => {
        dispatch(toggleFollowingProgress(false, userId));
      });
  };
};
