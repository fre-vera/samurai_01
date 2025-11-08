import { profileApi } from '../../api/api';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you', likesCount: 15 },
    { id: 2, message: 'My first post', likesCount: 20 },
  ],
  profile: null,
  isLoading: false,
  status: '',
};

export const profileThunk = createAsyncThunk(
  'profile/profileThunk',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await profileApi.getProfile(userId);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: 'Ошибка при получении данных авторизации',
        error: error.message,
      });
    }
  },
);

export const getStatus = createAsyncThunk(
  'profile/getStatus',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await profileApi.getStatus(userId);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: 'Ошибка при получении данных авторизации',
        error: error.message,
      });
    }
  },
);

export const updateStatus = createAsyncThunk(
  'profile/updateStatus',
  async (status, { rejectWithValue }) => {
    try {
      const response = await profileApi.updateStatus(status);
      if (response.resultCode === 0) {
        return status;
      } else {
        return rejectWithValue('Ошибка при обновлении статуса');
      }
    } catch (error) {
      return rejectWithValue({
        message: 'Ошибка при получении данных авторизации',
        error: error.message,
      });
    }
  },
);

export const updatePhoto = createAsyncThunk(
  'profile/updatePhoto',
  async (file, { rejectWithValue }) => {
    try {
      const response = await profileApi.updatePhoto(file);
      if (response.resultCode === 0) {
        return response.data.photos;
      } else {
        return rejectWithValue('Ошибка при обновлении фото');
      }
    } catch (error) {
      return rejectWithValue({
        message: 'Ошибка при получении фото',
        error: error.message,
      });
    }
  },
);

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
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profileThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(profileThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(profileThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getStatus.fulfilled, (state, action) => {
        state.status = action.payload;
      })
      .addCase(getStatus.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.status = action.payload;
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.photos = action.payload;
        }
      })
      .addCase(updatePhoto.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Action creators
export const {
  addPostActionCreator,
  deletePost,
} = profileSlice.actions;
