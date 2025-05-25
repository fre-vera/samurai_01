import { profileApi } from '../../api/api';

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const TOGGLE_PROFILE_LOADING = 'TOGGLE_PROFILE_LOADING';

const initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you', likesCount: 15 },
    { id: 2,  message: 'My first post', likesCount: 20 },
  ],
  newPostText: 'it-kamasutra.com',
  profile: null,
  isLoading: false,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: state.posts.length + 1,
        message: state.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: '',
      };
    case UPDATE_NEW_POST_TEXT:
      return {
        ...state,
        newPostText: action.newText,
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
    default:
      return state;
  }
};

export const addPostActionCreator = () => ({ type: ADD_POST });
export const updateNewPostTextActionCreator = (newText) =>
  ({ type: UPDATE_NEW_POST_TEXT, newText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const toggleProfileLoading = (isLoading) => ({ type: TOGGLE_PROFILE_LOADING, isLoading });

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
