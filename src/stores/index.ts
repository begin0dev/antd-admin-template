import { useDispatch } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import user from "./user";

const rootReducer = combineReducers({
  user,
});
export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
