import { createSlice } from "@reduxjs/toolkit";

export const TrainBookingDetailsSlice = createSlice({
  initialState: {
    departureStation: "",
    destinationStation: "",
    travelDate: "",
    leavingTimeHr: "",
    leavingTimeMinutes: "",
    ReachTimeHr: "",
    ReachTimeMinutes: "",
    Adults: "",
    Kids: "",
    seniorCitizen: "",
  },
  name: "TrainBookingDetails",
  reducers: {
    setTrainBookingDetailsValues: (state, actions) => {
      return {
        departureStation: actions.payload.departureStation,
        destinationStation: actions.payload.destinationStation,
        travelDate: actions.payload.travelDate,
        leavingTimeHr: actions.payload.leavingTimeHr,
        leavingTimeMinutes: actions.payload.leavingTimeMinutes,
        ReachTimeHr: actions.payload.ReachTimeHr,
        ReachTimeMinutes: actions.payload.ReachTimeMinutes,
        Adults: actions.payload.Adults,
        Kids: actions.payload.Kids,
        seniorCitizen: actions.payload.seniorCitizen,
      };
    },
  },
});

export const { setTrainBookingDetailsValues } = TrainBookingDetailsSlice.actions;
export default TrainBookingDetailsSlice.reducer;
