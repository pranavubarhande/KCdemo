// src/reducers/index.js
import { combineReducers } from "redux";
import darkmode from "./darkmode";

const rootReducer = combineReducers({
  darkmode:darkmode
  // Add more reducers here
});

export default rootReducer;
