import { createSlice } from "@reduxjs/toolkit";

export const AuthenticationSlice = createSlice({
  initialState: {
    userName: "Test User 1",
    userEmail: "testingUser1@gmail.com",
    IsAdmin: false,
    isLogin : false
  },
  name: "Authentication",
  reducers: {
    isSignIn: (state,actions) => {
      return actions.payload;
    },
  },
});

export const { isSignIn } = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;