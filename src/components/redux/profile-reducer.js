import { profileApi } from '../../api/api';

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const TOGGLE_PROFILE_LOADING = 'TOGGLE_PROFILE_LOADING';
const SET_STATUS = 'SET_STATUS';

const initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you', likesCount: 15 },
    { id: 2,  message: 'My first post', likesCount: 20 },
  ],
  profile: null,
  isLoading: false,
  status: '',
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: state.posts.length + 1,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case TOGGLE_PROFILE_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };
    default:
      return state;
  }
};

// Action creators
export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const toggleProfileLoading = (isLoading) => ({ type: TOGGLE_PROFILE_LOADING, isLoading });
export const setStatus = (status) => ({ type: SET_STATUS, status });

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
