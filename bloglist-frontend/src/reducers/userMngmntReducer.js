import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogsService from '../services/blogs';

const initialState = null;

const userMngmntReducer = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    setLoginUser(state, action) {
      return action.payload;
    },
    logout() {
      return initialState;
    },
  },
});

export const { setLoginUser, logout } = userMngmntReducer.actions;

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    window.localStorage.setItem('loggedInUser', JSON.stringify(user));

    blogsService.setToken(user.token);
    dispatch(setLoginUser(user));
  };
};

export const setUser = (user) => {
  blogsService.setToken(user.token);
  return setLoginUser(user);
};

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedInUser');
    dispatch(logout());
  };
};

export default userMngmntReducer.reducer;
