import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./Reducer/userReducer";
console.log("user reducer", userReducer);

export const server = "https://streamsubs.onrender.com/api/v1";

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: userReducer,
  },
});

export default store;
