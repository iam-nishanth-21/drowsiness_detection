import { combineReducers } from "@reduxjs/toolkit";
import apiReducer from "./apiReducer/apiReducer";
import tripReducer from "./tripReducer/tripReducer";

const reducers = combineReducers({
  trip: tripReducer,
});

export default reducers;
