import { createSlice } from "@reduxjs/toolkit";

export const TrainDetailsSlice = createSlice({
  initialState: {
    data:[] ,
    allData : []
  },
  name: "TrainDetailsSlice",
  reducers: {
    setTrainDetailsData : (state,actions) => {
      return { data : actions.payload.data , allData : actions.payload.allData  };
    },
  },
});

export const { setTrainDetailsData  } = TrainDetailsSlice.actions;
export default TrainDetailsSlice.reducer;