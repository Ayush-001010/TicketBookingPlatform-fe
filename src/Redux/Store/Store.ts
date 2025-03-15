import { configureStore } from "@reduxjs/toolkit";
import AuthenticationSlice from "../Slices/Authentication";
import  TrainDetailsSlice  from "../Slices/TrainDetails";
import  TrainBookingDetailsSlice  from "../Slices/TrainBookingDetails";


export const store = configureStore({
  reducer: {
    AuthenticationSlice : AuthenticationSlice,
    TrainDetailsSlice : TrainDetailsSlice,
    TrainBookingDetailsSlice : TrainBookingDetailsSlice
  },
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch