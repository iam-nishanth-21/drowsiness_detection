import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { message } from "antd";
import { ITrip } from "../../../interfaces/trip.interface";

type tripState = {
  trips: ITrip[];
};

const initialState: tripState = {
  trips: [],
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setTrip: (state: tripState, action: PayloadAction<ITrip[]>) => {
      state.trips = action.payload;
    },
  },
});

export const { setTrip } = tripSlice.actions;
export default tripSlice.reducer;
