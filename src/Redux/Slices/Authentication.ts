import { createSlice } from "@reduxjs/toolkit";

export const AuthenticationSlice = createSlice({
  initialState: {
    userName: "Test User 1",
    userEmail: "testingUser1@gmail.com",
    isAdmin: true,
  },
  name: "Authentication",
  reducers: {
    isSignIn: (state,actions) => {
      console.log("State  ", state,"    Actions",actions);
      return actions.payload;
    },
  },
});

export const { isSignIn } = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;