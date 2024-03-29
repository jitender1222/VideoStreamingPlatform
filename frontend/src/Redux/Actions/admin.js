import { server } from "../store";

import axios from "axios";

export const createCourse = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "createCourseRequest" });

    const { data } = await axios.post(
      `${server}/course/createcourse`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    console.log("data", data);
    dispatch({ type: "createCourseSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "createCourseFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllUsersRequest" });

    const { data } = await axios.get(`${server}/admin/users`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({ type: "getAllUsersSuccess", payload: data.users });
  } catch (error) {
    dispatch({
      type: "getAllUsersFail",
      payload: error.response.data.message,
    });
  }
};

export const updateUserRole = (id) => async (dispatch) => {
  try {
    dispatch({ type: "updateUserRoleRequest" });

    const { data } = await axios.put(
      `${server}/admin/users/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    dispatch({ type: "updateUserRoleSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateUserRoleFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteUserRole = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteUserRequest" });

    const { data } = await axios.delete(`${server}/admin/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    dispatch({ type: "deleteUserSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteUserFail",
      payload: error.response.data.message,
    });
  }
};

export const addLecture = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: "addLectureRequest" });

    const { data } = await axios.post(
      `${server}/course/lectures/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    dispatch({ type: "addLectureSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "addLectureFail",
      payload: error.response.data.message,
    });
  }
};

export const deleteCourse = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteCourseRequest" });

    const { data } = await axios.delete(`${server}/course/lectures/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: "deleteCourseSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteCourseFail",
      payload: error.response.data.message,
    });
  }
};
