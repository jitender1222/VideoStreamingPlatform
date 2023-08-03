import { configureStore } from "@reduxjs/toolkit";

import { profileReducer, userReducer } from "./Reducer/userReducer";
import { courseReducer } from "./Reducer/courseReducer";
import { otherReducer } from "./Reducer/otherReducer";
import { adminReducer } from "./Reducer/adminReducer";

export const server = "https://streamsubs.onrender.com/api/v1";

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    course: courseReducer,
    other: otherReducer,
    admin: adminReducer,
  },
});

export default store;
