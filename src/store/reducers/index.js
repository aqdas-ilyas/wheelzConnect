import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userDataSlice";

const rootReducer = combineReducers({
  user: userSlice,
});

export default rootReducer;
