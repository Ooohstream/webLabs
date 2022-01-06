import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    firstName: "",
    lastName: "",
    email: "",
    isAuth: false,
  },
  reducers: {
    login(state, { payload }) {
      state = { ...payload, isAuth: true };
      return state;
    },
    logout(state) {
      state = { isAuth: false };
      return state;
    },
  },
});

export default AuthSlice.reducer;

export const { login, logout } = AuthSlice.actions;
