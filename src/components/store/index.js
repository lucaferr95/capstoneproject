import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import favReducer from "../reducers/favReducer";

const rootReducer = combineReducers({
  fav: favReducer, // La chiave 'fav' deve corrispondere con quella che usi nel componente Favourites
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
