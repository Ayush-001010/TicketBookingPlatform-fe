import { createSlice } from "@reduxjs/toolkit";

export const BookTrainTicket = createSlice({
  initialState: {
    isStart: false,
    data: [],
  },
  name: "TrainBookingDetails",
  reducers: {
    setBookTrainTicket: (state, actions) => {
      return actions.payload;
    },
  },
});

export const { setBookTrainTicket } = BookTrainTicket.actions;
export default BookTrainTicket.reducer;
