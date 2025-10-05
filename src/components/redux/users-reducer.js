import { usersAPI } from '../../api/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isUsersLoading: false,
  followingInProgress: [],
  error: null,
};

export const getUsersThunkCreator = createAsyncThunk(
  'users/getUsersThunkCreator',
  async ({ currentPage, pageSize }, { rejectWithValue }) => {
    try {
      const response = await usersAPI.getUsers(currentPage, pageSize);
      return {
        users: response.items,
        totalCount: response.totalCount,
      };
    } catch (error) {
      return rejectWithValue({
        message: 'Ошибка при получении данных пользователей',
        error: error.message,
      });
    }
  },
);

export const followUserThunk = createAsyncThunk(
  'users/followUserThunk',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await usersAPI.follow(userId);
      if (response.resultCode === 0) {
        return userId;
      } else {
        return rejectWithValue('Ошибка при подписке');
      }
    } catch (error) {
      return rejectWithValue({
        message: 'Ошибка при подписке',
        error: error.message,
      });
    }
  },
);

export const unFollowUserThunk = createAsyncThunk(
  'users/unFollowUserThunk',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await usersAPI.unfollow(userId);
      if (response.resultCode === 0) {
        return userId;
      } else {
        return rejectWithValue('Ошибка при отписке');
      }
    } catch (error) {
      return rejectWithValue({
        message: 'Ошибка при отписке',
        error: error.message,
      });
    }
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // setUsersAC: (state, action) => {
    //   state.users = action.payload;
    // },
    setIsUsersLoadingAC: (state, action) => {
      state.isUsersLoading = action.payload;
    },
    setCurrentPageAC: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    // getUsers
      .addCase(getUsersThunkCreator.pending, (state) => {
        state.isUsersLoading = true;
        state.error = null;
      })
      .addCase(getUsersThunkCreator.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.totalUsersCount = action.payload.totalCount;
        state.isUsersLoading = false;
      })
      .addCase(getUsersThunkCreator.rejected, (state, action) => {
        state.error = action.payload;
        state.isUsersLoading = false;
      })
    // follow
      .addCase(followUserThunk.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user.id === action.payload ? { ...user, followed: true } : user,
        );
        state.followingInProgress = state.followingInProgress.filter((id) => id !== action.payload);
      })
      .addCase(followUserThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.followingInProgress = state.followingInProgress.filter((id) => id !== action.meta.arg);
      })
      // unfollow
      .addCase(unFollowUserThunk.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user.id === action.payload ? { ...user, followed: false } : user,
        );
        state.followingInProgress = state.followingInProgress.filter((id) => id !== action.payload);
      })
      .addCase(unFollowUserThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.followingInProgress = state.followingInProgress.filter((id) => id !== action.meta.arg);
      });
  },
});

// Action creators
export const {
  setCurrentPageAC,
  setIsUsersLoadingAC,
} = usersSlice.actions;
