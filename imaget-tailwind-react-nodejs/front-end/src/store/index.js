import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/AuthSlice";

const rootReducer = combineReducers({
  auth: AuthSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
