import { configureStore } from '@reduxjs/toolkit';

import notificationReducer from './notificationReducer';
import blogsReducers from './blogsReducers';
import userMngmntReducer from './userMngmntReducer';
import usersReducer from './usersReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducers,
    loggedInUser: userMngmntReducer,
    users: usersReducer,
  },
});

export default store;
