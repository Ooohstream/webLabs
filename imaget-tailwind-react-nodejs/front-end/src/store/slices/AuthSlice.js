import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: "",
  reducers: {
    login(state, { payload }) {
      state = payload;
      return state;
    },
    logout(state) {
      state = "";
      return state;
    },
  },
});

export default AuthSlice.reducer;

export const { login, logout } = AuthSlice.actions;
