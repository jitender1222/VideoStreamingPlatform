import { server } from "../store";

import axios from "axios";

export const getAllCourses =
  (category = "", keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: "allCoursesRequest" });

      const { data } = await axios.get(
        `${server}/course/allCourse?keyword=${keyword}&category=${category}`
      );

      console.log("data", data.getAll);

      dispatch({ type: "allCoursesSuccess", payload: data.getAll });
    } catch (error) {
      dispatch({
        type: "allCoursesFail",
        payload: error.response.data.message,
      });
    }
  };

export const getCourseLecture = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getCoursesRequest" });

    const { data } = await axios.get(`${server}/course/lectures/${id}`, {
      withCredentials: true,
    });

    // console.log("data", data.getAll);

    dispatch({ type: "getCoursesSuccess", payload: data.lectures });
  } catch (error) {
    dispatch({
      type: "getCoursesFail",
      payload: error.response.data.message,
    });
  }
};
