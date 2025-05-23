import { createSlice } from "@reduxjs/toolkit";

export const AddTrainData = createSlice({
  initialState: {
    data : null
  },
  name: "AddTrainData",
  reducers: {
    setAddTrainDataFunc: (state,actions) => {
      return {data : actions.payload};
    },
  },
});

export const { setAddTrainDataFunc } = AddTrainData.actions;
export default AddTrainData.reducer;