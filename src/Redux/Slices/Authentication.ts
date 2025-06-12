import { createSlice } from "@reduxjs/toolkit";

export const AuthenticationSlice = createSlice({
  initialState: {
    userEmail: "",
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