import { createSlice } from "@reduxjs/toolkit";

export const TrainDetailsSlice = createSlice({
  initialState: {
    data:[]
  },
  name: "TrainDetailsSlice",
  reducers: {
    setTrainDetailsData : (state,actions) => {
      return { data : actions.payload};
    },
  },
});

export const { setTrainDetailsData  } = TrainDetailsSlice.actions;
export default TrainDetailsSlice.reducer;