import { server } from "../store";

import axios from "axios";

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
