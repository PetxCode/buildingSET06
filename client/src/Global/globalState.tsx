import { createSlice } from "@reduxjs/toolkit";

interface iData {
  accessToken?: string;
  refreshToken?: string;
}

const initialState = {
  user: {} as iData | null,
  token: "" as string | null,
};

const globalState = createSlice({
  name: "auth",
  initialState,
  reducers: {
    currentUser: (state, { payload }) => {
      state.user = payload;
    },

    updateToken: (state, { payload }) => {
      state.token = payload;
    },

    removeToken: (state, { payload }) => {
      state.token = null;
    },

    logOut: (state) => {
      state.user = null;
    },
  },
});

export const { currentUser, logOut, removeToken, updateToken } =
  globalState.actions;

export default globalState.reducer;
