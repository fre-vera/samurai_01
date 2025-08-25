import { usersAPI } from '../../api/api';
import { createSlice } from '@reduxjs/toolkit';

// const UNFOLLOW = 'UNFOLLOW';
// const FOLLOW = 'FOLLOW';
// const SET_USERS = 'SET_USERS';
// const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
// const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
// const SET_IS_USERS_LOADING = 'SET_IS_USERS_LOADING';
// const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

const initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isUsersLoading: false,
  followingInProgress: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unFollowAC: (state, action) => {
      state.users = state.users.map((user) =>
        user.id === action.payload ? { ...user, followed: false } : user,
      );
    },
    followAC: (state, action) => {
      state.users = state.users.map((user) =>
        user.id === action.payload ? { ...user, followed: true } : user,
      );
    },
    setUsersAC: (state, action) => {
      state.users = action.payload;
    },
    setCurrentPageAC: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalUsersCountAC: (state, action) => {
      state.totalUsersCount = action.payload;
    },
    setIsUsersLoadingAC: (state, action) => {
      state.isUsersLoading = action.payload;
    },
    toggleFollowingProgress: (state, action) => {
      const { isFetching, userId } = action.payload;
      state.followingInProgress = isFetching
        ? [...state.followingInProgress, userId]
        : state.followingInProgress.filter((id) => id !== userId);
    },
  },
});

// Action creators
export const {
  unFollowAC,
  followAC,
  setUsersAC,
  setCurrentPageAC,
  setTotalUsersCountAC,
  setIsUsersLoadingAC,
  toggleFollowingProgress,
} = usersSlice.actions;

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
        dispatch(toggleFollowingProgress(true, userId));
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
