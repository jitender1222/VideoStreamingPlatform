import { createReducer } from "@reduxjs/toolkit";

export const courseReducer = createReducer(
  {},
  {
    getAllUserRequest: (state) => {
      state.loading = true;
    },
    getAllUserSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    },
    getAllUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
);
