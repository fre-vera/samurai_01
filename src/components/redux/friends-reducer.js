import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersAPI } from '../../api/api';

export const getFriendsThunk = createAsyncThunk(
  'friends/getFriends',
  async (_, { rejectWithValue }) => {
    try {
      const response = await usersAPI.getUsers(1, 100, true);
      return response.items;
    } catch (error) {
      return rejectWithValue('Ошибка при получении списка друзей');
    }
  },
);

export const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    friends: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFriendsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFriendsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.friends = action.payload;
      })
      .addCase(getFriendsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
