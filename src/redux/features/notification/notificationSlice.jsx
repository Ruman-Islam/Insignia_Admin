import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    isAlert: false,
    message: "success",
    type: "success",
  },
  reducers: {
    openAlertBox: (state, action) => {
      return (state = { ...state, ...action.payload });
    },
    closeAlertBox: (state, action) => {
      return (state = { ...state, ...action.payload });
    },
  },
});

export const { openAlertBox, closeAlertBox } = notificationSlice.actions;

export default notificationSlice.reducer;
