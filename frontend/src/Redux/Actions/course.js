import { server } from "../store";

import axios from "axios";

export const getAllCourses =
  (category = "", keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: "allCoursesRequest" });

      const { data } = await axios.get(
        `${server}/course/courses?keyword=${keyword}&category=${category}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch({ type: "allCoursesSuccess", payload: data.message });
    } catch (error) {
      dispatch({
        type: "allCoursesFail",
        payload: error.response.data.message,
      });
    }
  };
