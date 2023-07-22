import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer";

export const server = "https://streamsubs.onrender.com/api/v1";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
