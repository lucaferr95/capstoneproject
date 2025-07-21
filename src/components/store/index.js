import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import favReducer from "../reducers/favReducer";
import pointReducer from "../reducers/pointReducer";
const rootReducer = combineReducers({
  fav: favReducer,
  pointReducer: pointReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
