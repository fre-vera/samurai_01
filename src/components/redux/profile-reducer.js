import { profileApi } from '../../api/api';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you', likesCount: 15 },
    { id: 2,  message: 'My first post', likesCount: 20 },
  ],
  profile: null,
  isLoading: false,
  status: '',
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addPostActionCreator: (state, action) => {
      state.posts.push({
        id: state.posts.length + 1,
        message: action.payload,
      });
    },
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    toggleProfileLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

// Action creators
export const {
  addPostActionCreator,
  setUserProfile,
  toggleProfileLoading,
  setStatus,
  deletePost,
} = profileSlice.actions;

// Thunks
export const profileThunk = (userId) => async (dispatch) => {
  dispatch(toggleProfileLoading(true));
  try {
    const response = await profileApi.getProfile(userId);
    dispatch(setUserProfile(response));
  } catch (error) {
    console.error('Ошибка при загрузке профиля:', error);
  } finally {
    dispatch(toggleProfileLoading(false));
  }
};

export const getStatus = (userId) => async (dispatch) => {
  try {
    const response = await profileApi.getStatus(userId);
    dispatch(setStatus(response));
  } catch (error) {
    console.error('Ошибка при загрузке профиля:', error);
  }
};

export const updateStatus = (status) => async (dispatch) => {
  try {
    const response = await profileApi.updateStatus(status);
    if (response.resultCode === 0) {
      dispatch(setStatus(status));
    }
  } catch (error) {
    console.error('Ошибка при обновлении статуса:', error);
  }
};
