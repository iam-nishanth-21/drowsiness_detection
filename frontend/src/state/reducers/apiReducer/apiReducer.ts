import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";

const apiSlice = createSlice({
  name: "api",
  initialState: {
    value: "Test",
  },
  reducers: {
    apiRequestSuccess: (state, action: PayloadAction<string>) => {
      // message.success(action.payload);
    },
    apiRequestFailed: (state, action: PayloadAction<string>) => {
      message.error(action.payload);
    },
  },
});

export const { apiRequestSuccess, apiRequestFailed } = apiSlice.actions;
export default apiSlice.reducer;
