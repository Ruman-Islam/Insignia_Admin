import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {},
  reducers: {
    setSystemConfig: (state, action) => (state = { ...action.payload }),
  },
});

export const { setSystemConfig } = dashboardSlice.actions;

export default dashboardSlice.reducer;
