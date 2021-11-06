import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { loginApi, LoginApiParamsInterface } from "../lib/services/auth";
import { StorageManager } from "../lib/managers/storageManager";

// action
const login = createAsyncThunk("users/login", async (params: LoginApiParamsInterface) => {
  const storageManager = new StorageManager();
  const {
    data: {
      data: { token, user },
    },
  } = await loginApi(params);
  storageManager.setApiToken(token);
  storageManager.setCurrentUser(user);

  return user;
});

// state
export interface UserInterface {
  username: string;
  iat: number;
  exp: number;
}
interface UserStateInterface {
  isLogIn: boolean;
  currentUser: null | UserInterface;
}

const storageManager = new StorageManager();

const initialState: UserStateInterface = {
  isLogIn: !!storageManager.currentUser,
  currentUser: storageManager.currentUser,
};

// reduce
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout(state) {
      storageManager.clearCurrentUser();

      state.isLogIn = false;
      state.currentUser = null;
    },
  },
  extraReducers: {
    [login.fulfilled.type]: (state, { payload }) => {
      state.isLogIn = true;
      state.currentUser = payload;
    },
    [login.rejected.type]: (state) => {
      state.isLogIn = false;
      state.currentUser = null;
    },
  },
});

export const userActions = { ...userSlice.actions, login };
export default userSlice.reducer;
