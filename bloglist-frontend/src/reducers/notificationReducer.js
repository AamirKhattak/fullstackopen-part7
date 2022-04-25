import { createSlice } from '@reduxjs/toolkit';

const initialState = { notificationText: null, timeoutID: null };

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    create(state, action) {
      return action.payload;
    },
    remove() {
      return initialState;
    },
  },
});

export const { remove, create } = notificationSlice.actions;

export const setNotification = (
  notificationText,
  durationInSeconds = 5,
  prevNotificationTimeoutID
) => {
  return async (dispatch) => {
    if (prevNotificationTimeoutID) clearTimeout(prevNotificationTimeoutID);

    const timeoutID = setTimeout(() => {
      dispatch(remove());
    }, 1000 * durationInSeconds);
    dispatch(create({ notificationText, timeoutID }));
  };
};

export default notificationSlice.reducer;
