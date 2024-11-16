import { createSlice } from "@reduxjs/toolkit";

const checkAuthenticationStatus = () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return {
      isAuthenticated: false,
      token: null,
      redirectURL: "/login",
    };
  }
  return {
    isAuthenticated: true,
    token,
    redirectURL: "/login",
  };
};

const authenticationSlice = createSlice({
  name: "authenticator",
  initialState: checkAuthenticationStatus(),
  reducers: {
    login(state, { payload }) {
      state.isAuthenticated = true;
      state.token = payload.token;
      localStorage.setItem("access_token", payload.token);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("access_token");
      localStorage.clear();
    },
  },
});

export const authenticationActions = authenticationSlice.actions;

export default authenticationSlice.reducer;
