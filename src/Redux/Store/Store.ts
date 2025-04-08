import { configureStore } from "@reduxjs/toolkit";
import AuthenticationSlice from "../Slices/Authentication";
import  TrainDetailsSlice  from "../Slices/TrainDetails";
import  TrainBookingDetailsSlice  from "../Slices/TrainBookingDetails";
import  BookTrainTicket  from "../Slices/BookTrainTicket";
import  AddTrainData  from "../Slices/AddTrainData";


export const store = configureStore({
  reducer: {
    AuthenticationSlice : AuthenticationSlice,
    TrainDetailsSlice : TrainDetailsSlice,
    TrainBookingDetailsSlice : TrainBookingDetailsSlice,
    BookTrainTicket : BookTrainTicket,
    AddTrainData : AddTrainData
  },
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch