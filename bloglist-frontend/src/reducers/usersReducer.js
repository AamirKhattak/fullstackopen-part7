import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users';
import { setNotification } from './notificationReducer';

const initialState = [];

const usersSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

const { setUsers } = usersSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const users = await usersService.getAll();
      dispatch(setUsers(users));
    } catch (error) {
      dispatch(setNotification(error.message));
    }
  };
};

export default usersSlice.reducer;
