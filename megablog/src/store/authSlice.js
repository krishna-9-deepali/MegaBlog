import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
      // console.log(
      //   "action",
      //   action,
      //   "action payload",
      //   action.payload,
      //   "action payload userdata",
      //   action.payload.userData
      // );
      // console.log("slice userdata", state.userData);
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
