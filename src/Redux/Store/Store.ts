import { configureStore } from "@reduxjs/toolkit";
import AuthenticationSlice from "../Slices/Authentication";


export const store = configureStore({
  reducer: {
    AuthenticationSlice : AuthenticationSlice
  },
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch