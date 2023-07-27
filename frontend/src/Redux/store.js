import { configureStore } from "@reduxjs/toolkit";

import { profileReducer, userReducer } from "./Reducer/userReducer";
import { courseReducer } from "./Reducer/courseReducer";

export const server = "https://streamsubs.onrender.com/api/v1";

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    course: courseReducer,
  },
});

export default store;
