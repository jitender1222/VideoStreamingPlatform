import { createReducer } from "@reduxjs/toolkit";

export const courseReducer = createReducer(
  { courses: [] },
  {
    allCoursesRequest: (state) => {
      state.loading = true;
    },
    allCoursesSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    },
    allCoursesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addedToPlaylistRequest: (state) => {
      state.loading = true;
    },
    addedToPlaylistSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    },
    addedToPlaylistFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);
